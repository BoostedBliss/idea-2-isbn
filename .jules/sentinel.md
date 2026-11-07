## YYYY-MM-DD - AI Endpoint Rate Limiting
**Vulnerability:** The `/api/generate-keywords` endpoint which invokes the Google Gemini AI API lacked rate limiting.
**Learning:** High-value or potentially expensive external API integrations need explicit rate limiting to prevent Denial of Wallet (billing exhaustion) or abuse.
**Prevention:** Always apply rate limiting middleware to endpoints that invoke external paid services or perform intensive computations.

## 2026-11-07 - Missing Input Validation and Secure Error Handling in AI Endpoint
**Vulnerability:** The `/api/generate-keywords` endpoint lacked strict input type and length validation, making it vulnerable to payload abuse and potential prompt injection. It also leaked raw external API error messages to the client.
**Learning:** Endpoints interacting with external services (like Gemini AI) must strictly validate incoming parameters to prevent abuse, and must implement generic error handling to avoid leaking infrastructure details.
**Prevention:** Always implement strict type checking, reasonable length limits on request body parameters, and return generic error messages for server-side exceptions.
