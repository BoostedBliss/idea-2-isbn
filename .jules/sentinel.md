## YYYY-MM-DD - AI Endpoint Rate Limiting
**Vulnerability:** The `/api/generate-keywords` endpoint which invokes the Google Gemini AI API lacked rate limiting.
**Learning:** High-value or potentially expensive external API integrations need explicit rate limiting to prevent Denial of Wallet (billing exhaustion) or abuse.
**Prevention:** Always apply rate limiting middleware to endpoints that invoke external paid services or perform intensive computations.

## 2025-03-01 - Input Validation for LLM Prompts & Secure Error Handling
**Vulnerability:** The `/api/generate-keywords` endpoint directly injected user inputs (`categoryName`, `categoryPath`, `genre`, `audienceIntent`) into the LLM prompt without length limitations. Furthermore, the generic error handler exposed internal `err.message` data to the client.
**Learning:** External API dependencies, particularly AI tools, are vulnerable to Denial of Wallet (DoS) if excessive inputs are allowed. Additionally, blindly returning caught error messages can leak proxy setups or backend SDK details.
**Prevention:** Always validate and bound the length of input parameters when interpolating into LLM prompts. Always log verbose error details internally but return sanitized, generic error responses to clients.
