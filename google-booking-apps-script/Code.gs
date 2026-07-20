const CONFIG = {
  timezone: "Europe/Kyiv",
  calendarId: "primary",
  spreadsheetId: "17GkUJHSZpJhHG1Ap4bA_DZCfQLxL7zaHT-yW7hecmYQ",
  ownerEmail: "les@alexlogos.consulting",
  titlePrefix: "LES AION · Навігаційна розмова",
  durationMinutes: 30,
  slotIntervalMinutes: 45,
  dailyLimit: 4,
  weeklyLimit: 20,
  daysAhead: 28,
  startHour: 10,
  startMinute: 30,
  endHour: 14,
  endMinute: 0,
};

function setup() {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  CalendarApp.getDefaultCalendar().getName();
  return `Підключено: ${spreadsheet.getName()}`;
}

function doGet(e) {
  try {
    authorize_(e.parameter.secret);
    if (e.parameter.action !== "slots") throw new Error("Unknown action");
    return json_({ ok: true, slots: getAvailableSlots_() });
  } catch (error) {
    return json_({ ok: false, error: String(error.message || error) });
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    authorize_(payload.secret);
    if (payload.action === "lead") return json_(captureLead_(payload.lead));
    if (payload.action === "book") return json_(book_(payload));
    throw new Error("Unknown action");
  } catch (error) {
    return json_({ ok: false, error: String(error.message || error) });
  }
}

function getAvailableSlots_() {
  const calendar = CalendarApp.getDefaultCalendar();
  const now = new Date();
  const slots = [];

  for (let dayOffset = 1; dayOffset <= CONFIG.daysAhead; dayOffset += 1) {
    const day = new Date(now);
    day.setDate(now.getDate() + dayOffset);
    day.setHours(0, 0, 0, 0);
    const weekday = Number(Utilities.formatDate(day, CONFIG.timezone, "u"));
    if (weekday > 5) continue;

    const week = weekBounds_(day);
    const weeklyBookings = calendar.getEvents(week.start, week.end, { search: CONFIG.titlePrefix }).length;
    if (weeklyBookings >= CONFIG.weeklyLimit) continue;

    const dayEnd = new Date(day);
    dayEnd.setHours(CONFIG.endHour, CONFIG.endMinute, 0, 0);
    const dayEvents = calendar.getEvents(day, new Date(day.getTime() + 86400000));
    let dailyCount = dayEvents.filter(event => event.getTitle().indexOf(CONFIG.titlePrefix) === 0).length;
    let cursor = new Date(day);
    cursor.setHours(CONFIG.startHour, CONFIG.startMinute, 0, 0);

    while (cursor.getTime() + CONFIG.durationMinutes * 60000 <= dayEnd.getTime() && dailyCount < CONFIG.dailyLimit && weeklyBookings + slotsInWeek_(slots, week) < CONFIG.weeklyLimit) {
      const end = new Date(cursor.getTime() + CONFIG.durationMinutes * 60000);
      const conflict = dayEvents.some(event => event.getStartTime() < end && event.getEndTime() > cursor);
      if (!conflict && cursor.getTime() > now.getTime() + 4 * 3600000) {
        slots.push({
          start: cursor.toISOString(),
          end: end.toISOString(),
          label: Utilities.formatDate(cursor, CONFIG.timezone, "HH:mm"),
          dayLabel: capitalize_(Utilities.formatDate(cursor, CONFIG.timezone, "EEEE, d MMMM")),
        });
        dailyCount += 1;
      }
      cursor = new Date(cursor.getTime() + CONFIG.slotIntervalMinutes * 60000);
    }
  }
  return slots;
}

function book_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const start = new Date(payload.slot.start);
    const end = new Date(payload.slot.end);
    if (!isAllowedSlot_(start, end)) throw new Error("Некоректний час зустрічі");

    const calendar = CalendarApp.getDefaultCalendar();
    if (calendar.getEvents(start, end).length) throw new Error("Цей час уже зайнятий");
    const week = weekBounds_(start);
    if (calendar.getEvents(week.start, week.end, { search: CONFIG.titlePrefix }).length >= CONFIG.weeklyLimit) throw new Error("Ліміт зустрічей на цей тиждень вичерпано");

    const properties = PropertiesService.getScriptProperties();
    const meetingUrl = properties.getProperty("MEETING_URL") || "";
    const description = buildDescription_(payload, meetingUrl);
    const resource = {
      summary: `${CONFIG.titlePrefix} · ${payload.lead.name}`,
      description,
      start: { dateTime: start.toISOString(), timeZone: CONFIG.timezone },
      end: { dateTime: end.toISOString(), timeZone: CONFIG.timezone },
      attendees: [{ email: payload.lead.email }],
      reminders: { useDefault: false, overrides: [{ method: "email", minutes: 1440 }, { method: "popup", minutes: 120 }] },
    };
    if (meetingUrl) {
      resource.location = meetingUrl;
    } else {
      resource.conferenceData = { createRequest: { requestId: Utilities.getUuid(), conferenceSolutionKey: { type: "hangoutsMeet" } } };
    }

    const event = Calendar.Events.insert(resource, CONFIG.calendarId, { conferenceDataVersion: 1, sendUpdates: "all" });
    const finalMeetingUrl = meetingUrl || (event.conferenceData && event.conferenceData.entryPoints ? (event.conferenceData.entryPoints.find(item => item.entryPointType === "video") || {}).uri : "");
    updateBooking_(payload, event, finalMeetingUrl);
    MailApp.sendEmail({
      to: CONFIG.ownerEmail,
      subject: `Новий Zoom-лід LES AION: ${payload.lead.name}`,
      htmlBody: buildOwnerBrief_(payload, start, finalMeetingUrl),
      name: "LES AION",
    });
    return { ok: true, eventId: event.id, eventUrl: event.htmlLink, meetingUrl: finalMeetingUrl };
  } finally {
    lock.releaseLock();
  }
}

function captureLead_(lead) {
  if (!lead || !lead.email) throw new Error("Email is required");
  const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName("Leads");
  if (!sheet) throw new Error("Leads sheet not found");
  const result = lead.result || {};
  const row = [
    lead.submittedAt ? new Date(lead.submittedAt) : new Date(),
    lead.name || "", lead.email || "", lead.country || "", "lesaion.world",
    lead.situationLabel || lead.situation || "", lead.goalLabel || lead.goal || "",
    lead.obstacleLabel || lead.obstacle || "", lead.experience || "", lead.note || "",
    lead.aiReadiness || "", lead.urgency || "", result.segmentTitle || result.segment || "",
    result.readiness || "", result.score || "", "Новий лід", "", "", "", ""
  ];
  const targetRow = sheet.getLastRow() === 2 && !sheet.getRange(2, 3).getValue() ? 2 : sheet.getLastRow() + 1;
  sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);
  return { ok: true };
}

function updateBooking_(payload, event, meetingUrl) {
  const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName("Leads");
  if (!sheet) return;
  const lastRow = sheet.getLastRow();
  const emails = lastRow > 1 ? sheet.getRange(2, 3, lastRow - 1, 1).getValues() : [];
  let row = 0;
  for (let index = emails.length - 1; index >= 0; index -= 1) {
    if (String(emails[index][0]).toLowerCase() === String(payload.lead.email).toLowerCase()) { row = index + 2; break; }
  }
  if (!row) {
    captureLead_({ ...payload.lead, result: payload.result, submittedAt: new Date().toISOString() });
    row = sheet.getLastRow();
  }
  sheet.getRange(row, 16, 1, 4).setValues([["Записано", new Date(), event.id || "", meetingUrl || ""]]);
}

function isAllowedSlot_(start, end) {
  const weekday = Number(Utilities.formatDate(start, CONFIG.timezone, "u"));
  const startTime = Utilities.formatDate(start, CONFIG.timezone, "HH:mm");
  const endTime = Utilities.formatDate(end, CONFIG.timezone, "HH:mm");
  return weekday <= 5 && startTime >= "10:30" && endTime <= "14:00" && end.getTime() - start.getTime() === CONFIG.durationMinutes * 60000;
}

function weekBounds_(date) {
  const day = Number(Utilities.formatDate(date, CONFIG.timezone, "u"));
  const start = new Date(date);
  start.setDate(start.getDate() - day + 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  return { start, end };
}

function slotsInWeek_(slots, week) {
  return slots.filter(slot => { const date = new Date(slot.start); return date >= week.start && date < week.end; }).length;
}

function buildDescription_(payload, meetingUrl) {
  return [
    "Безкоштовна 30-хвилинна навігаційна розмова LES AION.",
    meetingUrl ? `Zoom: ${meetingUrl}` : "Посилання Google Meet додано до події.",
    "",
    `Клієнт: ${payload.lead.name} · ${payload.lead.email} · ${payload.lead.country}`,
    `Сегмент: ${payload.result.segmentTitle}`,
    `Готовність: ${payload.result.readiness} (${payload.result.score}/100)`,
    `Досвід: ${payload.lead.experience}`,
    `Бажаний результат: ${payload.lead.note || "не вказано"}`,
    `Перший крок: ${payload.result.firstStep}`,
    "",
    "Наступна можлива пропозиція: окрема Сесія ясності — 5 000 грн.",
  ].join("\n");
}

function buildOwnerBrief_(payload, start, meetingUrl) {
  return `<h2>Новий клієнт LES AION</h2><p><b>${escape_(payload.lead.name)}</b> · ${escape_(payload.lead.email)} · ${escape_(payload.lead.country)}</p><p><b>Час:</b> ${Utilities.formatDate(start, CONFIG.timezone, "dd.MM.yyyy HH:mm")} (Київ)</p><p><b>Сегмент:</b> ${escape_(payload.result.segmentTitle)} · ${escape_(payload.result.readiness)} · ${payload.result.score}/100</p><p><b>Досвід:</b> ${escape_(payload.lead.experience)}</p><p><b>Бажаний результат:</b> ${escape_(payload.lead.note || "не вказано")}</p><p><b>Можлива опора:</b> ${escape_(payload.result.support)}</p><p><b>Ризик:</b> ${escape_(payload.result.risk)}</p><p><b>Перший крок:</b> ${escape_(payload.result.firstStep)}</p>${meetingUrl ? `<p><a href="${escape_(meetingUrl)}">Відкрити зустріч</a></p>` : ""}<hr><p>Наступна можлива пропозиція: «Сесія ясності» — 5 000 грн.</p>`;
}

function authorize_(provided) {
  const expected = PropertiesService.getScriptProperties().getProperty("BOOKING_SECRET");
  if (expected && provided !== expected) throw new Error("Unauthorized");
}

function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function capitalize_(value) { return value.charAt(0).toUpperCase() + value.slice(1); }
function escape_(value) { return String(value || "").replace(/[&<>\"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char])); }
