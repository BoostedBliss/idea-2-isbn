## 2024-05-24 - [Input Validation Missing for AI Prompt]
**Vulnerability:** The API endpoint `/api/generate-keywords` does not validate or sanitize user input (`categoryName`, `categoryPath`, `genre`, `audienceIntent`) before incorporating it into a prompt sent to Google's Gemini AI. This could lead to prompt injection or denial of service by passing excessively large strings.
**Learning:** Even internal AI prompts require strict input validation on the backend to avoid passing unexpected types or huge amounts of data to the AI provider.
**Prevention:** Always enforce strict type checking and length limits on user input that will be sent to external APIs like LLMs.
