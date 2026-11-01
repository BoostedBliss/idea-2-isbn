## YYYY-MM-DD - AI Endpoint Rate Limiting
**Vulnerability:** The `/api/generate-keywords` endpoint which invokes the Google Gemini AI API lacked rate limiting.
**Learning:** High-value or potentially expensive external API integrations need explicit rate limiting to prevent Denial of Wallet (billing exhaustion) or abuse.
**Prevention:** Always apply rate limiting middleware to endpoints that invoke external paid services or perform intensive computations.

## 2025-02-27 - Information Leakage & Input Validation
**Vulnerability:** The `/api/generate-keywords` endpoint returned the raw error message (`err.message`) in its 500 response, potentially leaking internal Gemini API details or call stacks. It also lacked maximum length checks on input string properties.
**Learning:** Even internal API errors can expose stack traces or specifics of external services which attackers could use to craft targeted payloads. Unchecked input lengths present a minor DoS vector.
**Prevention:** Always catch exceptions at API boundaries and return generic error messages. Implement maximum length constraints on all input fields.
