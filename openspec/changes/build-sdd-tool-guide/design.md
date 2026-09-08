## Context

- The repository holds no application code or build tooling; Node 25 and npm are available, and the workshop already tells participants to run `npm run dev`.
- Every fact about the three tools was gathered by research and is hand-authored; nothing is fetched at runtime.
- Some steps write no files, some files appear only on one execution path, and at least one documented step has no documentation page of its own.
- Five views read the same underlying facts about the same three tools.

## Decisions

### Decision: Vite with React, built to static files

- **Choice:** Scaffold the site as a Vite project using React that builds to a static bundle with no server.
- **Why:** Selection state, the single-tool and comparison toggle, and cross-navigation are stateful interactions over one in-memory dataset; React expresses them directly, and Vite supplies both `npm run dev` and a static build with little configuration.
- **Trade-off:** Introduces a dependency tree and a build step into a repository that had neither, which is more machinery than hand-written HTML would need.

### Decision: One typed data module as the single source of tool facts

- **Choice:** Keep every tool's steps, files, example content, documentation links, and verification stamp in one typed module that all views import.
- **Why:** The same facts drive five views, so a single source stops them drifting apart, and the type checker catches a missing field before it reaches the page.
- **Trade-off:** The module grows large, dominated by example file content, and becomes the file anyone editing content must navigate.

### Decision: Store the step-to-file relation in one direction only

- **Choice:** Each step declares the ids of the files it writes, and the file-to-step direction is derived when rendering.
- **Why:** Storing both directions lets them contradict each other as content is edited.
- **Trade-off:** The derivation must handle a file written by more than one step instead of reading a single stored value.

### Decision: Model a documentation link as a state rather than a nullable address

- **Choice:** Represent each step's and each file's documentation as one of three explicit states: a link to a specific section, a link to a page only, or none.
- **Why:** The absence of documentation is content the reader is shown, and a missing address cannot distinguish that from an entry nobody has filled in yet.
- **Trade-off:** Every entry must declare a state, including the ordinary case where a specific section exists.
