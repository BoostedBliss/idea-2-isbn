## YYYY-MM-DD - AI Endpoint Rate Limiting
**Vulnerability:** The `/api/generate-keywords` endpoint which invokes the Google Gemini AI API lacked rate limiting.
**Learning:** High-value or potentially expensive external API integrations need explicit rate limiting to prevent Denial of Wallet (billing exhaustion) or abuse.
**Prevention:** Always apply rate limiting middleware to endpoints that invoke external paid services or perform intensive computations.

## 2024-05-18 - Missing Input Validation and Error Leakage
**Vulnerability:** The `/api/generate-keywords` endpoint lacked length/type validation on user input, and leaked the raw error string in responses.
**Learning:** Without explicit validation, third-party APIs can be exploited for prompt injection. Error objects expose internals and should be wrapped in generic messages.
**Prevention:** Always validate length and type of input parameters before using them, especially when interacting with LLMs. Mask errors sent to the client.
