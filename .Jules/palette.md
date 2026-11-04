## $(date +%Y-%m-%d) - Added missing ARIA labels to Keyword Slot Elements
**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only buttons (like the Copy button in the keyword slots) and their associated input fields often lack programmatic labels (`aria-label` or `aria-labelledby`). This makes them completely opaque to screen readers.
**Action:** When evaluating forms or interactive lists in this app, proactively check that every input and icon-only button has a descriptive `aria-label` that includes context (like the loop index) if applicable.
## 2024-11-04 - Form associations and accessible close buttons
**Learning:** This codebase frequently lacks `htmlFor`/`id` bindings on forms, and icon-only buttons like modal/sidebar close buttons are often missing `aria-label`.
**Action:** Always check form elements for proper label associations and ensure all icon-only buttons have an `aria-label`.
