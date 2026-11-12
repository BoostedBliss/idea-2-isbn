## YYYY-MM-DD - AI Endpoint Rate Limiting
**Vulnerability:** The `/api/generate-keywords` endpoint which invokes the Google Gemini AI API lacked rate limiting.
**Learning:** High-value or potentially expensive external API integrations need explicit rate limiting to prevent Denial of Wallet (billing exhaustion) or abuse.
**Prevention:** Always apply rate limiting middleware to endpoints that invoke external paid services or perform intensive computations.

## 2023-10-27 - AI Endpoint Input Validation & Error Handling
**Vulnerability:** The `/api/generate-keywords` endpoint lacked input type/length validation (risking prompt injection) and leaked raw error messages to the client.
**Learning:** External AI integrations must stringently validate inputs and use generic error messages to prevent abuse and information disclosure.
**Prevention:** Always implement strict type and length validation for request parameters and ensure error handling uses generic messages.
