## 1. Foundation

- [x] 1.1 Scaffold the Vite React project so `npm run dev` serves the site shell and the production build emits static files
- [x] 1.2 Define the typed tool data module covering steps, files, step-to-file ids, the three documentation-link states, and verification stamps
- [x] 1.3 Populate the module with verified content for all three tools, including steps that write no files and files written only under a stated condition

## 2. Single-tool views

- [x] 2.1 Build the flow view with step selection and a detail panel giving the step's purpose, how it is triggered, its documented variants, and its documentation state
- [x] 2.2 Build the artifact view with file selection and a detail panel giving real example content, the file's documentation state, and any condition under which it appears

## 3. Navigation, comparison, and provenance

- [x] 3.1 Derive the file-to-step relation from the stored step-to-file ids and wire navigation in both directions
- [x] 3.2 Build the comparison view placing all three tools' flows and folder structures side by side, with a single tool as the default
- [x] 3.3 Display each tool's verification source as a link and its check date in both the single-tool and comparison views

## 4. Verify

- [x] 4.1 Verify a reader can move from a step to a file it writes and from that file back to the writing step
- [x] 4.2 Verify each documentation-link state renders, including a step that states no documentation exists

_Known gap: the section and page states render from real data; the "no documentation" state is implemented but unexercised, because every step and file of the three remaining tools is documented. Superpowers, dropped from this change, was to have supplied it._
- [x] 4.3 Verify the production build serves every view and shows all three tools with their verification dates
