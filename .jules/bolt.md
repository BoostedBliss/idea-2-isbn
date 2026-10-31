## 2024-05-18 - Heavy List Filtering & Calculations on Input State
**Learning:** In a single-file React component like `App.tsx` where complex state (filtering 12-month metrics, calculating daily sales, computing cumulative array projection data) relies directly on the state variable from frequent user inputs (sliders, type-aheads), the UI blocks on every keystroke or slider tick.
**Action:** Use `useDeferredValue` for fast-updating UI states and pass the deferred variants to `useMemo`. This allows the input to paint immediately while React yields execution of the expensive filtering/math.
