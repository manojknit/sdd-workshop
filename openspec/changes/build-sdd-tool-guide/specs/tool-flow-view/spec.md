## ADDED Requirements

### Requirement: Single tool flow display

The site SHALL present one selected tool's workflow as an ordered sequence of its steps.

#### Scenario: Opening a tool

- **WHEN** a reader opens a tool
- **THEN** the site shows that tool's steps in the order the tool performs them

### Requirement: Step explanation on selection

The site SHALL explain what a step does when a reader selects that step.

#### Scenario: Selecting a step

- **WHEN** a reader selects a step in a tool's flow
- **THEN** the site describes what that step does

### Requirement: Link to step specific documentation

The site SHALL link a selected step to the most specific documentation available for that step.

#### Scenario: Documentation exists for the step

- **WHEN** a reader selects a step whose documentation has been located
- **THEN** the site offers a link to that documentation

#### Scenario: No documentation exists for the step

- **WHEN** a reader selects a step that has no documentation
- **THEN** the site states that no documentation exists for that step

### Requirement: How a step is triggered

The site SHALL state how each step is triggered.

#### Scenario: A step that runs without being requested

- **WHEN** a reader selects a step that its tool triggers automatically
- **THEN** the site states that the step runs without being requested

### Requirement: Documented workflow variants

The site SHALL note a tool's documented workflow variants in the detail of the step they affect.

#### Scenario: A variant that reorders steps

- **WHEN** a reader selects a step that a documented variant reorders or replaces
- **THEN** the site notes that variant and how it differs from the flow shown
