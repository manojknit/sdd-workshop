## ADDED Requirements

### Requirement: A step lists the files it writes

The site SHALL list the files a step writes in that step's detail.

#### Scenario: Viewing a step that writes files

- **WHEN** a reader selects a step that writes files
- **THEN** the site lists the files that step writes

### Requirement: Move from a step to a file it writes

The site SHALL let a reader move from a step to a file that step writes.

#### Scenario: Following a step to its output

- **WHEN** a reader selects a file listed in a step's detail
- **THEN** the site shows that file's example content

### Requirement: Move from a file to the step that writes it

The site SHALL let a reader move from a file to the step that writes it.

#### Scenario: Following a file back to its step

- **WHEN** a reader selects the writing step named in a file's detail
- **THEN** the site shows that step's explanation

### Requirement: Steps that write no files

The site SHALL state when a step writes no files.

#### Scenario: A step with no output

- **WHEN** a reader selects a step that writes no files
- **THEN** the site states that the step writes no files
