## $(date +%Y-%m-%d) - Added missing ARIA labels to Keyword Slot Elements
**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only buttons (like the Copy button in the keyword slots) and their associated input fields often lack programmatic labels (`aria-label` or `aria-labelledby`). This makes them completely opaque to screen readers.
**Action:** When evaluating forms or interactive lists in this app, proactively check that every input and icon-only button has a descriptive `aria-label` that includes context (like the loop index) if applicable.

## $(date +%Y-%m-%d) - Added missing id and htmlFor attributes to Form Elements
**Learning:** A recurring pattern in this app's forms (e.g. Voice Talent applicant form) is that visual `label` elements are used without `htmlFor` attributes, and their target inputs lack corresponding `id` attributes. This breaks the associative grouping for screen readers.
**Action:** Always ensure that every `<label>` tag explicitly binds to its corresponding form control via `htmlFor` and `id` attributes to maintain structural accessibility.
