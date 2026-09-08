## ADDED Requirements

### Requirement: Single tool folder structure

The site SHALL present one selected tool's outputs as a folder structure.

#### Scenario: Opening a tool's outputs

- **WHEN** a reader opens a tool's outputs
- **THEN** the site shows the files and directories that tool writes, in their relative positions

### Requirement: Real example content for a file

The site SHALL show real example content for a file when a reader selects it.

#### Scenario: Selecting a file

- **WHEN** a reader selects a file in a tool's folder structure
- **THEN** the site shows example content drawn from real use of that tool

### Requirement: Link to file documentation

The site SHALL link a selected file to its documentation when documentation for that file exists.

#### Scenario: A documented file

- **WHEN** a reader selects a file whose documentation has been located
- **THEN** the site offers a link to that documentation

#### Scenario: An undocumented file

- **WHEN** a reader selects a file that has no documentation
- **THEN** the site states that no documentation exists for that file

### Requirement: Outputs a tool writes only sometimes

The site SHALL state the condition under which a tool writes a file it does not always write.

#### Scenario: A file written only on one path

- **WHEN** a reader selects a file that its tool writes only under a stated condition
- **THEN** the site states the condition under which that file appears
