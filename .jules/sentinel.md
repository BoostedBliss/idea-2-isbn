## YYYY-MM-DD - AI Endpoint Rate Limiting
**Vulnerability:** The `/api/generate-keywords` endpoint which invokes the Google Gemini AI API lacked rate limiting.
**Learning:** High-value or potentially expensive external API integrations need explicit rate limiting to prevent Denial of Wallet (billing exhaustion) or abuse.
**Prevention:** Always apply rate limiting middleware to endpoints that invoke external paid services or perform intensive computations.

## YYYY-MM-DD - API Endpoint Input Validation and Error Handling
**Vulnerability:** The `/api/generate-keywords` endpoint was lacking type and length validation on incoming body properties which are later fed into an AI prompt, and leaked raw external error messages.
**Learning:** Endpoints that pass variables to AI models are at risk for payload abuse and prompt injection. Also, leaking raw API error messages could leak sensitive configuration or file details.
**Prevention:** Always strictly validate and limit the length of all user inputs before interacting with external services or passing to AI models. Always use a generic error message for external clients, while logging the full exception internally.
