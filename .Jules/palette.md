## $(date +%Y-%m-%d) - Added missing ARIA labels to Keyword Slot Elements
**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only buttons (like the Copy button in the keyword slots) and their associated input fields often lack programmatic labels (`aria-label` or `aria-labelledby`). This makes them completely opaque to screen readers.
**Action:** When evaluating forms or interactive lists in this app, proactively check that every input and icon-only button has a descriptive `aria-label` that includes context (like the loop index) if applicable.
## $(date +%Y-%m-%d) - Added missing ARIA labels to Modal and Sidebar Close Buttons
**Learning:** Found another accessibility issue pattern specific to this app's components: icon-only close buttons (`✕`) in sidebars and modals lack programmatic labels (`aria-label`). This makes it difficult for screen readers to understand the button's purpose (e.g. they might just hear "X" or "times").
**Action:** When evaluating forms or interactive layouts in this app, proactively check that every generic close button (`✕`) has a descriptive `aria-label` like "Close sidebar" or "Close modal".
