
## 2024-03-01 - Extracted Duplicate BSR Mapping to Pure Function
**Learning:** Found a codebase-specific pattern where identical mapping operations (like BSR to daily sales calculations) were duplicated across multiple `useMemo` hooks in large component views (e.g. `src/App.tsx`). This duplication increases component bundle size and complicates maintenance, even if JS engines might eventually optimize it.
**Action:** Extract shared mapping logic into pure functions external to the React components. This centralizes the logic and prevents redundant block evaluations across multiple `useMemo` hooks.
