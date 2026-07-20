# Google Calendar booking service

This Apps Script web app owns live availability and booking for LES AION.

## Business rules

- Monday–Friday, 10:30–14:00 Europe/Kyiv.
- 30-minute call with a 15-minute buffer.
- Four slots per day, maximum 20 per week.
- Owner brief is emailed from `LES AION` to `les@alexlogos.consulting`.
- If Script Property `MEETING_URL` is set, it is used as the Zoom location. Otherwise a Google Meet conference is created.

## Deployment

1. Create/deploy the Apps Script under the Google account whose primary calendar should be used.
2. Enable the Advanced Google Calendar service (the manifest requests it).
3. Add Script Property `BOOKING_SECRET` with a long random value.
4. Optionally add Script Property `MEETING_URL` with the permanent Zoom URL.
5. Deploy as a Web app: execute as yourself, access anyone.
6. Put its `/exec` URL in `LES_AION_GOOGLE_SCRIPT_URL` and the same secret in `LES_AION_BOOKING_SECRET` on the website.
