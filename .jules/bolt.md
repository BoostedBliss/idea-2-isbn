## 2023-11-12 - App.tsx Search Bottleneck
**Learning:** `App.tsx` has heavy `useMemo` computations filtering large arrays (`NICHE_CATEGORIES` and `GLOSSARY_TERMS`) on every keystroke, which blocks typing responsiveness since it's a huge component.
**Action:** Use React 19's native `useDeferredValue` for high-frequency text inputs (like `searchQuery` and `glossarySearch`) to immediately update the input but defer the expensive re-rendering/filtering to unblock the main thread.
