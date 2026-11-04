## YYYY-MM-DD - AI Endpoint Rate Limiting
**Vulnerability:** The `/api/generate-keywords` endpoint which invokes the Google Gemini AI API lacked rate limiting.
**Learning:** High-value or potentially expensive external API integrations need explicit rate limiting to prevent Denial of Wallet (billing exhaustion) or abuse.
**Prevention:** Always apply rate limiting middleware to endpoints that invoke external paid services or perform intensive computations.
## 2025-02-23 - Prevented API Input Abuse and Detail Leakage
**Vulnerability:** The `/api/generate-keywords` API endpoint lacked input validation (allowing excessive payload sizes via unvalidated fields) and exposed raw internal error strings to the client upon exceptions.
**Learning:** External API inputs must be validated to prevent excessively large or improperly typed payloads, which can cause prompt injection or billing exhaustion. Furthermore, returning raw `err.message` values to clients exposes potentially sensitive infrastructure or third-party details.
**Prevention:** Always validate all parameters strictly by type and length bounds. Use a generic, safe error message to wrap all internal exceptions when responding to clients.
