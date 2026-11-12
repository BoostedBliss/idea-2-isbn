## 2026-11-12 - Added missing ARIA labels to Keyword Slot Elements
**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only buttons (like the Copy button in the keyword slots) and their associated input fields often lack programmatic labels (`aria-label` or `aria-labelledby`). This makes them completely opaque to screen readers.
**Action:** When evaluating forms or interactive lists in this app, proactively check that every input and icon-only button has a descriptive `aria-label` that includes context (like the loop index) if applicable.

## 2026-11-12 - Added missing ARIA label to Modal Close Button
**Learning:** Found an accessibility issue pattern specific to modals in this app: the 'X' (close) buttons lack programmatic labels (`aria-label`). This makes them completely opaque to screen readers.
**Action:** When working on modals in this app, proactively check that the close buttons have a descriptive `aria-label` (e.g., `aria-label="Close audition portal"`).
