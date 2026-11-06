## YYYY-MM-DD - AI Endpoint Rate Limiting
**Vulnerability:** The `/api/generate-keywords` endpoint which invokes the Google Gemini AI API lacked rate limiting.
**Learning:** High-value or potentially expensive external API integrations need explicit rate limiting to prevent Denial of Wallet (billing exhaustion) or abuse.
**Prevention:** Always apply rate limiting middleware to endpoints that invoke external paid services or perform intensive computations.

## 2024-10-24 - Input Validation & Error Leakage in AI Endpoints
**Vulnerability:** The `/api/generate-keywords` endpoint lacked input type and length validations, exposing the service to prompt injection and Denial of Service through large payloads. Furthermore, error messages were exposing internal configuration details (`GEMINI_API_KEY environment variable is not configured`) and raw external API error messages (`err.message`).
**Learning:** External API integrations (like AI endpoints) act as a proxy and can easily leak internal states or pass unhandled payload abuse if not strictly validated.
**Prevention:** Implement strict length and type checking for all inputs reaching AI prompts. Sanitize error messages returned to the client to avoid leaking configuration states or raw external service details.
