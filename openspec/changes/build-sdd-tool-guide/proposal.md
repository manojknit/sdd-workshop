## Why

Someone new to Spec-Driven Development meets several tools that look interchangeable but differ sharply in how much ceremony they impose, what they write to disk, and whether they maintain a specification over time. Existing comparisons are prose, go stale quickly, and rarely show what a tool actually produces. A reader weighing SDD needs to see each tool's flow and its resulting files, and to line them up against each other.

## What Changes

- A static site presents three SDD tools: OpenSpec, GitHub Spec Kit, and Kiro.
- Each tool's workflow appears as one canonical visual flow, one tool at a time by default; documented variants are noted in the step detail rather than drawn separately.
- Each tool's outputs appear as a folder structure, one tool at a time by default.
- Selecting a step explains what it does and links to that step's own documentation, or states that none exists.
- Selecting a file shows real example content from that tool, plus a documentation link when one exists.
- Each step links to the files it produces, and each file links back to the step that writes it.
- A bird's eye view places all three tools side by side, for both flows and folder structures.
- Every tool shows the source it was verified against and the date it was checked.

## Capabilities

### New Capabilities

- `tool-flow-view`: A reader sees one tool's workflow as a visual flow and selects any step to learn what it does and reach that step's documentation.
- `tool-artifact-view`: A reader sees one tool's outputs as a folder structure and selects any file to see real example content from that tool.
- `flow-artifact-navigation`: A reader moves from a step to the files it produces, and from a file back to the step that writes it.
- `tool-comparison-view`: A reader switches from a single tool to a view placing all three side by side, for both flows and folder structures.
- `verification-provenance`: Each tool shows the source it was verified against and the date it was checked.

### Modified Capabilities

_None._

## Impact

- Adds application code and build tooling to a repository that currently contains none.
- Tool information will drift as these tools change; the displayed date makes that visible rather than preventing it.
