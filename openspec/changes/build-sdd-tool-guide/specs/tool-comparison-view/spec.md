## ADDED Requirements

### Requirement: Default to a single tool

The site SHALL show one tool rather than the comparison until a reader chooses the comparison.

#### Scenario: Arriving without choosing a view

- **WHEN** a reader arrives without choosing a view
- **THEN** the site shows a single tool

### Requirement: Switch between one tool and all tools

The site SHALL let a reader switch between viewing one tool and viewing all tools together.

#### Scenario: Switching to the comparison

- **WHEN** a reader switches to the comparison
- **THEN** the site shows every tool together

#### Scenario: Returning to a single tool

- **WHEN** a reader leaves the comparison for one tool
- **THEN** the site shows only that tool

### Requirement: Compare flows side by side

The site SHALL place each tool's flow alongside the other tools' flows when a reader compares flows.

#### Scenario: Comparing flows

- **WHEN** a reader compares flows
- **THEN** the site shows every tool's steps beside the other tools' steps

### Requirement: Compare folder structures side by side

The site SHALL place each tool's folder structure alongside the other tools' folder structures when a reader compares outputs.

#### Scenario: Comparing outputs

- **WHEN** a reader compares outputs
- **THEN** the site shows every tool's files beside the other tools' files
