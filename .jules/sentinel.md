## YYYY-MM-DD - AI Endpoint Rate Limiting
**Vulnerability:** The `/api/generate-keywords` endpoint which invokes the Google Gemini AI API lacked rate limiting.
**Learning:** High-value or potentially expensive external API integrations need explicit rate limiting to prevent Denial of Wallet (billing exhaustion) or abuse.
**Prevention:** Always apply rate limiting middleware to endpoints that invoke external paid services or perform intensive computations.

## YYYY-MM-DD - API Input Validation and Error Leakage
**Vulnerability:** The `/api/generate-keywords` endpoint lacked input validation for expected parameters, which could lead to DoS or injection attacks. Additionally, the error handler leaked internal error details (`err.message`) to the client.
**Learning:** All user inputs must be explicitly validated (type and length) before processing. Furthermore, error responses must be sanitized to prevent leaking sensitive technical information that could aid an attacker.
**Prevention:** Implement strict input validation logic early in request handlers. Return generic, safe error messages to clients while logging detailed errors internally.
