## 2025-02-27 - Cache Gemini API Responses
**Learning:** The `/api/generate-keywords` backend endpoint previously called the expensive Gemini AI model synchronously on every request without caching. Adding an in-memory `Map` cache based on the request body JSON string greatly accelerates repeated keyword searches and prevents unnecessary API cost.
**Action:** When implementing AI or third-party integration endpoints that return static/deterministic data based on input parameters, always introduce a caching layer (like an in-memory map or Redis for distributed apps) to improve response times.
