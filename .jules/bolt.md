## 2024-05-24 - Unbounded cache risk
**Learning:** Adding an unbounded in-memory `Map` as a cache can lead to Out-of-Memory (OOM) errors over time if there are a large number of unique keys and no eviction policy (like an LRU cache or periodic clearing).
**Action:** For simple, dependency-free caches using `Map`, consider adding a basic periodic clearing mechanism (`setInterval`) if long-term memory growth is a concern, or request permission to add an `lru-cache` dependency for robust production use cases.
