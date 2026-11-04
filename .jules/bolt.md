## 2025-02-28 - Extract Duplicated React State Maps
**Learning:** Extracting duplicated mapping logic (like a lengthy BSR-to-sales if/else block) from within multiple React `useMemo` hooks to an external pure function improves maintainability and potentially helps memory slightly, but does not provide a massive execution performance gain. JavaScript engines optimize inline blocks, so this is primarily a DRY/readability optimization rather than a strict performance one.
**Action:** Focus on memoization, virtualization, network requests, and loop optimizations for true performance gains.
