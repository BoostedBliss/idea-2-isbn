## YYYY-MM-DD - AI Endpoint Rate Limiting
**Vulnerability:** The `/api/generate-keywords` endpoint which invokes the Google Gemini AI API lacked rate limiting.
**Learning:** High-value or potentially expensive external API integrations need explicit rate limiting to prevent Denial of Wallet (billing exhaustion) or abuse.
**Prevention:** Always apply rate limiting middleware to endpoints that invoke external paid services or perform intensive computations.

## 2024-05-18 - Input Validation & Generic Error Messages in AI Endpoints
**Vulnerability:** The `/api/generate-keywords` endpoint lacked length/type validation for user inputs sent to an AI prompt, risking prompt injection and payload abuse. Additionally, it exposed raw external error messages (`err.message`) to the client on failure.
**Learning:** External API integrations (especially AI models) require strict input sanitation to prevent manipulation and prompt injection. Also, error handling must never expose raw external error strings or stack traces.
**Prevention:** Always implement strict type and length validation for request parameters (especially string inputs used in AI prompts) and ensure error handling uses generic, non-leaking messages for the client.
