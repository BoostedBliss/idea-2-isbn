## $(date +%Y-%m-%d) - Added missing ARIA labels to Keyword Slot Elements
**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only buttons (like the Copy button in the keyword slots) and their associated input fields often lack programmatic labels (`aria-label` or `aria-labelledby`). This makes them completely opaque to screen readers.
**Action:** When evaluating forms or interactive lists in this app, proactively check that every input and icon-only button has a descriptive `aria-label` that includes context (like the loop index) if applicable.
## 2024-05-19 - Added ARIA labels and focus states to modal form and close button
**Learning:** Forms in modals often lack proper `htmlFor` and `id` associations for screen readers, and icon-only close buttons are frequently missing `aria-label`s and `focus-visible` styling.
**Action:** Always ensure modal forms have explicit input-label associations and that their close buttons are fully accessible to both keyboard and screen reader users.
