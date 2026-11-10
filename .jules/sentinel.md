## YYYY-MM-DD - AI Endpoint Rate Limiting
**Vulnerability:** The `/api/generate-keywords` endpoint which invokes the Google Gemini AI API lacked rate limiting.
**Learning:** High-value or potentially expensive external API integrations need explicit rate limiting to prevent Denial of Wallet (billing exhaustion) or abuse.
**Prevention:** Always apply rate limiting middleware to endpoints that invoke external paid services or perform intensive computations.

## 2025-02-27 - Prompt Injection and Error Leakage in AI Endpoint
**Vulnerability:** The `/api/generate-keywords` endpoint, which constructs a prompt for the Gemini AI model, accepted arbitrary unvalidated payload fields (`categoryName`, `categoryPath`, `genre`, `audienceIntent`). Also, when the API failed, it leaked `err.message` raw string to the client.
**Learning:** In LLM applications, missing validation of variables inserted into prompts creates prompt injection vulnerabilities. Additionally, surfacing direct API error messages can expose implementation details or raw error objects.
**Prevention:** Always use strict typing and reasonable length bounds on inputs used for LLM prompt generation. Wrap LLM integrations with generic catch blocks to prevent error detail leakage.
