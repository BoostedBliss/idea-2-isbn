## 2024-11-03 - [Extracted duplicated useMemo mapping logic]
**Learning:** Found a codebase-specific pattern where identical static mapping operations (BSR-to-sales `if-else` blocks) were duplicated across multiple `useMemo` hooks in `src/App.tsx`.
**Action:** Extracting such shared mapping logic into pure functions external to the React components prevents redundant block evaluations and reduces component bundle size overhead. Always look for duplicated static logic inside hooks.
