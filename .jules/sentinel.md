## YYYY-MM-DD - AI Endpoint Rate Limiting
**Vulnerability:** The `/api/generate-keywords` endpoint which invokes the Google Gemini AI API lacked rate limiting.
**Learning:** High-value or potentially expensive external API integrations need explicit rate limiting to prevent Denial of Wallet (billing exhaustion) or abuse.
**Prevention:** Always apply rate limiting middleware to endpoints that invoke external paid services or perform intensive computations.

## YYYY-MM-DD - API Input Validation and Error Handling
**Vulnerability:** The `/api/generate-keywords` endpoint lacked strict type/length validation (prompt injection risk) and exposed raw internal error messages (`err.message`) to clients.
**Learning:** External API wrappers must sanitize and validate inputs strictly before passing them to LLMs, and must never leak internal stack traces or API error details to frontend clients.
**Prevention:** Always validate API request bodies by type and length, and wrap external API calls in generic try/catch error responses.
