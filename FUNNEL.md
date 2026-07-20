# LES AION Zoom funnel

## Implemented route

Traffic → landing page → Transition Mirror → server-side qualification → personal result → booking link → Zoom.

The browser submits the assessment to `POST /api/funnel/lead`. The route validates the payload, assigns a segment and readiness score, creates the brief and optionally forwards the full lead to `LES_AION_LEAD_WEBHOOK_URL`.

## Required production configuration

1. Deploy `google-booking-apps-script` and set `LES_AION_GOOGLE_SCRIPT_URL` plus `LES_AION_BOOKING_SECRET`.
2. Set `LES_AION_BOOKING_URL` as the fallback application page.
3. Set `LES_AION_LEAD_WEBHOOK_URL` to a CRM or automation webhook so leads are persisted. Without it, the route logs only non-sensitive lead metadata and returns the result, but the full lead is not stored.
4. Preserve the existing server-only OpenAI and publishing secrets from the production environment. Never expose them with a `NEXT_PUBLIC_` prefix.

## Webhook payload

The webhook receives contact fields, experience and transition answers, UTM/referrer source, human-readable labels, the generated Mirror result, readiness score and ISO submission time.

## Recommended next integration

Connect the webhook to a CRM table and trigger: immediate confirmation, 24-hour reminder, 2-hour Zoom reminder, no-show follow-up, post-call proposal and lead-stage dashboard.
