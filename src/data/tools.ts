import type { Tool } from './types';

/**
 * Every fact shown on this site. Each tool was read from its own
 * documentation on the date recorded in its verification stamp; nothing here
 * is fetched at runtime, so the stamp is what tells a reader how fresh it is.
 */

const openspec: Tool = {
  id: 'openspec',
  name: 'OpenSpec',
  tagline: 'Agree on the change, in artifacts you review like code.',
  summary:
    'OpenSpec keeps a change in its own folder until it ships, then merges what became true into a set of living specs. You drive it with slash commands in your AI assistant, backed by a CLI that scaffolds and validates.',
  steps: [
    {
      id: 'explore',
      name: 'Explore',
      purpose:
        'A no-stakes conversation that reads the codebase, compares options, and turns a vague worry into a change worth proposing.',
      trigger: { kind: 'requested', detail: 'You run `/opsx:explore` in your AI assistant.' },
      variants: [
        'Optional. If you already know exactly what you want, skip it and start at `/opsx:propose`.',
      ],
      writes: [],
      documentation: {
        state: 'section',
        label: 'Commands — /opsx:explore',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md#opsxexplore',
      },
    },
    {
      id: 'propose',
      name: 'Propose',
      purpose:
        'Creates the change folder and generates every planning artifact the schema requires, stopping when the change is ready to implement.',
      trigger: { kind: 'requested', detail: 'You run `/opsx:propose [change-name]`.' },
      variants: [
        'The expanded workflow splits this step: `/opsx:new` scaffolds the folder, then `/opsx:continue` creates one artifact at a time so you can review each before the next.',
        '`/opsx:ff` fast-forwards instead, creating all planning artifacts in dependency order in one go.',
      ],
      writes: ['change-meta', 'proposal', 'delta-spec', 'design', 'tasks'],
      documentation: {
        state: 'section',
        label: 'Commands — /opsx:propose',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md#opsxpropose',
      },
    },
    {
      id: 'update',
      name: 'Update the plan',
      purpose:
        'Revises the planning artifacts and reconciles them with each other, confirming every edit with you. It never touches code.',
      trigger: { kind: 'requested', detail: 'You run `/opsx:update [change-name]`.' },
      variants: [
        'Optional, and not limited to this point in the flow: run it whenever implementation reveals the plan was wrong.',
        'If the intent of the change has shifted rather than been refined, the documentation says to start a new change instead of updating this one.',
      ],
      writes: ['proposal', 'delta-spec', 'design', 'tasks'],
      documentation: {
        state: 'section',
        label: 'Commands — /opsx:update',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md#opsxupdate',
      },
    },
    {
      id: 'apply',
      name: 'Apply',
      purpose:
        'Works through the task list, writing the code each task calls for and checking the task off as it goes.',
      trigger: { kind: 'requested', detail: 'You run `/opsx:apply [change-name]`.' },
      variants: [
        'Progress lives in the task checkboxes, so an interrupted run resumes where it stopped.',
      ],
      writes: ['tasks'],
      documentation: {
        state: 'section',
        label: 'Commands — /opsx:apply',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md#opsxapply',
      },
    },
    {
      id: 'verify',
      name: 'Verify',
      purpose:
        'Checks the implementation against the artifacts on three fronts — completeness, correctness, and coherence — and reports what it finds.',
      trigger: { kind: 'requested', detail: 'You run `/opsx:verify [change-name]`.' },
      variants: [
        'Part of the expanded command set rather than the default `core` profile; enable it with `openspec config profile`.',
        'Findings never block the archive; they are warnings you choose to act on.',
      ],
      writes: [],
      documentation: {
        state: 'section',
        label: 'Commands — /opsx:verify',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md#opsxverify',
      },
    },
    {
      id: 'sync',
      name: 'Sync specs',
      purpose:
        'Merges the change\u2019s delta spec into the main specs, adding, replacing, or removing requirements while leaving everything else intact.',
      trigger: { kind: 'requested', detail: 'You run `/opsx:sync [change-name]`.' },
      variants: [
        'Usually skipped: archive offers to sync for you, so most people never run this step directly.',
      ],
      writes: ['main-spec'],
      documentation: {
        state: 'section',
        label: 'Commands — /opsx:sync',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md#opsxsync',
      },
    },
    {
      id: 'archive',
      name: 'Archive',
      purpose:
        'Finalises the change: it offers to sync any unsynced specs, then moves the whole folder into the dated archive with its artifacts preserved.',
      trigger: { kind: 'requested', detail: 'You run `/opsx:archive [change-name]`.' },
      variants: [
        'Incomplete tasks produce a warning rather than a refusal.',
        '`/opsx:bulk-archive` archives several finished changes at once and resolves spec conflicts between them.',
      ],
      writes: ['main-spec', 'archived-change'],
      documentation: {
        state: 'section',
        label: 'Commands — /opsx:archive',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md#opsxarchive',
      },
    },
  ],
  files: [
    {
      id: 'config',
      path: 'openspec/config.yaml',
      summary:
        'Project configuration: the default schema, the context injected into every artifact, and rules for individual artifacts. Created by `openspec init` in the terminal rather than by any step in the flow.',
      example: `schema: workshop-compact

context: |
  This repository is used for a hands-on Spec-Driven Development workshop.
  Participants read each planning artifact live and should understand it in
  two to three minutes.

rules:
  proposal:
    - "Target 220-360 words; never exceed 440 words."
    - "Why: a short paragraph of 2-4 sentences."
  specs:
    - "Prefer 2-5 requirements per capability."
    - "For an ADDED requirement, use one short normative sentence with exactly one SHALL."`,
      documentation: {
        state: 'section',
        label: 'Customization — Project Configuration',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md#project-configuration',
      },
    },
    {
      id: 'schema',
      path: 'openspec/schemas/<schema-name>/schema.yaml',
      summary:
        'A custom workflow: which artifacts exist, what each one generates, and which artifacts must exist first.',
      condition:
        'Only present when a team forks a built-in workflow with `openspec schema fork` or writes one with `openspec schema init`.',
      example: `name: my-workflow
version: 1
description: My team's custom workflow

artifacts:
  - id: proposal
    generates: proposal.md
    description: Initial proposal document
    template: proposal.md
    requires: []

  - id: tasks
    generates: tasks.md
    description: Implementation checklist
    template: tasks.md
    requires:
      - design

apply:
  requires: [tasks]
  tracks: tasks.md`,
      documentation: {
        state: 'section',
        label: 'Customization — Schema Structure',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md#schema-structure',
      },
    },
    {
      id: 'main-spec',
      path: 'openspec/specs/<capability>/spec.md',
      summary:
        'The source of truth: how the system behaves today, as requirements with scenarios. Changes merge into it; nothing is written here by hand mid-change.',
      example: `# Auth Specification

## Purpose
Authentication and session management for the application.

## Requirements

### Requirement: User Authentication
The system SHALL issue a JWT token upon successful login.

#### Scenario: Valid credentials
- GIVEN a user with valid credentials
- WHEN the user submits login form
- THEN a JWT token is returned
- AND the user is redirected to dashboard`,
      documentation: {
        state: 'section',
        label: 'Concepts — Specs',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md#specs',
      },
    },
    {
      id: 'change-meta',
      path: 'openspec/changes/<change-name>/.openspec.yaml',
      summary:
        'Metadata for this change: which workflow schema it follows and when it was created.',
      condition:
        'Optional. The documentation lists it as an optional file; without it the schema falls back to the project config.',
      example: `schema: workshop-compact
created: 2026-09-07`,
      documentation: {
        state: 'section',
        label: 'Concepts — Change Structure',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md#change-structure',
      },
    },
    {
      id: 'proposal',
      path: 'openspec/changes/<change-name>/proposal.md',
      summary: 'Why the change exists and where its boundary sits.',
      example: `## Why

Someone new to Spec-Driven Development meets several tools that look
interchangeable but differ sharply in how much ceremony they impose and what
they write to disk.

## What Changes

- A static site presents three SDD tools: OpenSpec, GitHub Spec Kit, and Kiro.
- Each tool's workflow appears as one canonical visual flow.
- Every tool shows the source it was verified against and the date it was checked.

## Capabilities

### New Capabilities

- \`tool-flow-view\`: A reader sees one tool's workflow as a visual flow.
- \`tool-artifact-view\`: A reader sees one tool's outputs as a folder structure.`,
      documentation: {
        state: 'section',
        label: 'Concepts — Proposal',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md#proposal-proposalmd',
      },
    },
    {
      id: 'delta-spec',
      path: 'openspec/changes/<change-name>/specs/<capability>/spec.md',
      summary:
        'What this change adds, modifies, or removes — stated as a delta against the main spec rather than a restatement of it.',
      example: `## ADDED Requirements

### Requirement: Link to step specific documentation

The site SHALL link a selected step to the most specific documentation
available for that step.

#### Scenario: Documentation exists for the step

- **WHEN** a reader selects a step whose documentation has been located
- **THEN** the site offers a link to that documentation

#### Scenario: No documentation exists for the step

- **WHEN** a reader selects a step that has no documentation
- **THEN** the site states that no documentation exists for that step`,
      documentation: {
        state: 'section',
        label: 'Concepts — Delta Specs',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md#delta-specs',
      },
    },
    {
      id: 'design',
      path: 'openspec/changes/<change-name>/design.md',
      summary: 'The consequential technical choices and what each one costs.',
      example: `## Decisions

### Decision: Store the step-to-file relation in one direction only

- **Choice:** Each step declares the ids of the files it writes, and the
  file-to-step direction is derived when rendering.
- **Why:** Storing both directions lets them contradict each other as content
  is edited.
- **Trade-off:** The derivation must handle a file written by more than one
  step instead of reading a single stored value.`,
      documentation: {
        state: 'section',
        label: 'Concepts — Design',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md#design-designmd',
      },
    },
    {
      id: 'tasks',
      path: 'openspec/changes/<change-name>/tasks.md',
      summary:
        'The implementation checklist. Apply reads it, works through it, and ticks each box, so it doubles as the progress record.',
      example: `## 1. Foundation

- [x] 1.1 Scaffold the Vite React project so \`npm run dev\` serves the site shell
- [x] 1.2 Define the typed tool data module
- [ ] 1.3 Populate the module with verified content for all three tools

## 2. Single-tool views

- [ ] 2.1 Build the flow view with step selection and a detail panel
- [ ] 2.2 Build the artifact view with file selection and a detail panel`,
      documentation: {
        state: 'section',
        label: 'Concepts — Tasks',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md#tasks-tasksmd',
      },
    },
    {
      id: 'archived-change',
      path: 'openspec/changes/archive/YYYY-MM-DD-<change-name>/',
      summary:
        'The finished change, moved wholesale under the date it was archived, with every artifact preserved as an audit trail.',
      condition: 'Written when the change is archived, and not before.',
      example: `openspec/changes/archive/2025-01-24-add-dark-mode/
├── proposal.md
├── design.md
├── tasks.md
├── .openspec.yaml
└── specs/
    └── ui/
        └── spec.md`,
      documentation: {
        state: 'section',
        label: 'Commands — /opsx:archive',
        url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md#opsxarchive',
      },
    },
  ],
  verification: {
    state: 'checked',
    source: 'OpenSpec documentation (commands, workflows, concepts, customization)',
    url: 'https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md',
    checkedOn: '2026-09-07',
  },
};

const kiro: Tool = {
  id: 'kiro',
  name: 'Kiro',
  tagline: 'Three documents, with an approval gate between each one.',
  summary:
    'Kiro builds every feature as a spec: requirements, then design, then tasks, each generated in the editor and each waiting for you to say it looks right before the next appears. Tasks are then executed from the file itself.',
  steps: [
    {
      id: 'create-spec',
      name: 'Create the spec',
      purpose:
        'Starts a spec session. Kiro asks whether you are building a feature or fixing a bug, and which workflow to follow.',
      trigger: {
        kind: 'requested',
        detail:
          'You click the + button under Specs in the Kiro pane, choose Spec in the chat pane, or run `/spec new <name>` in the CLI.',
      },
      variants: [
        'Choosing Design-First swaps the first two documents: the design is written first and requirements are derived from it, with an extra step that asks for high-level or low-level detail.',
        'Choosing Quick Spec keeps the same three documents but removes the approval gates between them.',
        'Choosing Bug Fix replaces the requirements document with a bug analysis.',
        'A default workflow can be set in Kiro settings, which skips this choice.',
      ],
      writes: [],
      documentation: {
        state: 'section',
        label: 'Requirements-First Workflow — Create Feature Spec',
        url: 'https://kiro.dev/docs/specs/feature-specs/requirements-first/#1-create-feature-spec',
      },
    },
    {
      id: 'requirements',
      name: 'Requirements phase',
      purpose:
        'Turns your description into user stories with acceptance criteria, written as EARS statements of the form "WHEN a condition, THE SYSTEM SHALL do something".',
      trigger: {
        kind: 'automatic',
        detail:
          'Kiro generates the requirements document as soon as the spec exists; your part is to review it and confirm it.',
      },
      variants: [
        'In Design-First this phase moves after the design, so requirements are derived from an architecture already validated.',
      ],
      writes: ['requirements'],
      documentation: {
        state: 'section',
        label: 'Requirements-First Workflow — Requirements Phase',
        url: 'https://kiro.dev/docs/specs/feature-specs/requirements-first/#2-requirements-phase',
      },
    },
    {
      id: 'analyze',
      name: 'Analyze requirements',
      purpose:
        'Reads the requirements against each other, looking for contradictions, ambiguities, unstated assumptions, and missing edge cases, then asks you about what it found.',
      trigger: {
        kind: 'requested',
        detail:
          'You pick Analyze Requirements from the chat options or the Continue dropdown after requirements are generated.',
      },
      variants: [
        'Optional: the documentation says to skip it for small or well-understood specs and go straight to design.',
        'Available in the IDE and CLI only, not on the web.',
      ],
      writes: ['requirements'],
      documentation: {
        state: 'section',
        label: 'Analyze Requirements — How to invoke it',
        url: 'https://kiro.dev/docs/specs/analyze-requirements/#how-to-invoke-it',
      },
    },
    {
      id: 'design',
      name: 'Design phase',
      purpose:
        'Describes how the requirements will be implemented: architecture and components, sequence diagrams, data models and interfaces, error handling, and a testing strategy.',
      trigger: {
        kind: 'requested',
        detail: 'It runs once you confirm the requirements — the gate can be as light as replying "LGTM".',
      },
      variants: [
        'Quick Spec removes this gate, so the design is generated automatically straight after the requirements.',
        'In the IDE this phase also extracts properties from the EARS requirements for property-based tests.',
      ],
      writes: ['design'],
      documentation: {
        state: 'section',
        label: 'Requirements-First Workflow — Design Phase',
        url: 'https://kiro.dev/docs/specs/feature-specs/requirements-first/#3-design-phase',
      },
    },
    {
      id: 'tasks',
      name: 'Tasks phase',
      purpose:
        'Breaks the design into discrete, trackable tasks with their dependencies, marking which are required and which are optional.',
      trigger: { kind: 'requested', detail: 'It runs once you confirm the design.' },
      variants: ['Quick Spec removes this gate too, generating all three documents in one pass.'],
      writes: ['tasks'],
      documentation: {
        state: 'section',
        label: 'Requirements-First Workflow — Tasks Phase',
        url: 'https://kiro.dev/docs/specs/feature-specs/requirements-first/#4-tasks-phase',
      },
    },
    {
      id: 'task-hooks',
      name: 'Task hooks',
      purpose:
        'Runs a shell command or an agent prompt around every task — before it starts and after it completes. A pre-task hook can refuse to let the task run.',
      trigger: {
        kind: 'automatic',
        detail:
          'Hooks activate when a session starts, with no registration and no prompting: if a hook file exists, the Pre Task Execution trigger fires whenever a task moves to in_progress.',
      },
      variants: [
        'Only present when the project contains a hook file under `.kiro/hooks/`.',
        'The task triggers are available in the IDE only.',
      ],
      writes: [],
      documentation: {
        state: 'section',
        label: 'Hook Types — Pre Task Execution',
        url: 'https://kiro.dev/docs/hooks/types/#pre-task-execution-ide-only',
      },
    },
    {
      id: 'execute',
      name: 'Task execution',
      purpose:
        'Implements the tasks and moves each one through In Progress to Done in the task file as it goes.',
      trigger: {
        kind: 'requested',
        detail:
          'You start a single task from the link above it, run them all at once, or run `/spec run <name>` in the CLI.',
      },
      variants: [
        'Running everything only picks up incomplete tasks that are marked required.',
        'Independent tasks are grouped into waves and run concurrently, with the waves themselves running in order.',
      ],
      writes: ['tasks'],
      documentation: {
        state: 'section',
        label: 'Specs — Task Execution',
        url: 'https://kiro.dev/docs/specs/#task-execution',
      },
    },
  ],
  files: [
    {
      id: 'requirements',
      path: '.kiro/specs/<feature-name>/requirements.md',
      summary:
        'User stories and acceptance criteria in EARS notation, so each line reads as a condition and the behaviour the system owes in response.',
      example: `# Requirements Document

## Requirements

### Requirement 1: Automatic Label Assignment

**User Story:** As a repository maintainer, I want issues to be automatically
labeled when created, so that I can quickly identify and prioritize issues
without manual categorization.

#### Acceptance Criteria

1. WHEN a new issue is created, THE Issue_Manager SHALL analyze the issue title
   and body using Bedrock_Classifier
2. WHEN the analysis is complete, THE Label_Assigner SHALL assign relevant
   feature/component labels from the predefined set
3. WHEN label assignment fails, THE Issue_Manager SHALL log the error and
   continue without blocking issue creation

(from .kiro/specs/github-issue-automation/requirements.md in kirodotdev/Kiro)`,
      documentation: {
        state: 'section',
        label: 'Feature Specs — Requirements with EARS Notation',
        url: 'https://kiro.dev/docs/specs/feature-specs/#requirements-with-ears-notation',
      },
    },
    {
      id: 'bugfix',
      path: '.kiro/specs/<feature-name>/bugfix.md',
      summary:
        'A bug stated as three behaviours: what happens now, what should happen, and what must keep working.',
      condition:
        'Written instead of the requirements document when the spec is a Bugfix Spec rather than a feature.',
      example: `Current Behavior (Defect)
- WHEN [condition] THEN the system [incorrect behavior]

Expected Behavior (Correct)
- WHEN [condition] THEN the system SHALL [correct behavior]

Unchanged Behavior (Regression Prevention)
- WHEN [condition] THEN the system SHALL CONTINUE TO [existing behavior]`,
      documentation: {
        state: 'section',
        label: 'Bugfix Specs — Bugfix Analysis Phase',
        url: 'https://kiro.dev/docs/specs/bugfix-specs/#1-bugfix-analysis-phase',
      },
    },
    {
      id: 'design',
      path: '.kiro/specs/<feature-name>/design.md',
      summary:
        'The technical picture: architecture, the components and how they interact, and diagrams of the flow between them.',
      example: `# Design Document: GitHub Issue Automation

## Overview

This design describes an automated GitHub issue management system that
leverages AWS Bedrock's Claude Sonnet 4.5 model for intelligent issue
classification, duplicate detection, and lifecycle management.

## Architecture

\`\`\`mermaid
graph TB
    A[New Issue Created] --> B[Issue Triage Workflow]
    B --> C[Bedrock Classifier]
    C --> D[Label Assignment]
    C --> E[Duplicate Detection]
\`\`\`

### Component Architecture

1. **GitHub Actions Workflows** - Orchestration layer that triggers on events
2. **Bedrock Integration Module** - TypeScript module for the Bedrock API
3. **Label Assignment Module** - Analyzes AI output and applies labels

(from .kiro/specs/github-issue-automation/design.md in kirodotdev/Kiro)`,
      documentation: {
        state: 'section',
        label: 'Feature Specs — Design Documentation',
        url: 'https://kiro.dev/docs/specs/feature-specs/#design-documentation',
      },
    },
    {
      id: 'tasks',
      path: '.kiro/specs/<feature-name>/tasks.md',
      summary:
        'The implementation plan, with nested subtasks, optional tasks marked by an asterisk, and each task citing the requirements it satisfies.',
      example: `# Implementation Plan: GitHub Issue Automation

## Tasks

- [x] 1. Set up project structure and dependencies
  - Create \`scripts/\` directory for TypeScript modules
  - Create \`package.json\` with dependencies
  - _Requirements: 5.1, 5.2_

- [ ] 2. Implement core data models
  - [x] 2.1 Create data models module (\`data_models.ts\`)
    - Implement \`ClassificationResult\` interface
    - Export DEFAULT_LABEL_TAXONOMY constant
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ]* 2.2 Write unit tests for data models
    - Test edge cases (empty values, undefined handling)
    - _Requirements: 6.1, 6.2_

(from .kiro/specs/github-issue-automation/tasks.md in kirodotdev/Kiro)`,
      documentation: {
        state: 'section',
        label: 'Specs — Task Execution',
        url: 'https://kiro.dev/docs/specs/#task-execution',
      },
    },
    {
      id: 'steering',
      path: '.kiro/steering/product.md',
      summary:
        'Standing context about the product that Kiro includes in every interaction, alongside `tech.md` and `structure.md`.',
      condition:
        'Written only when you ask for steering documents, with the Generate Steering Docs button or by setting up steering yourself. The spec workflow never creates them.',
      example: `# Product Overview

Spirit of Kiro is an infinite crafting workshop game that demonstrates
AI-powered game development. The game features:

- **Infinite Item Generation**: Every item is unique with AI-generated names,
  descriptions, damage values, and quirks
- **Dynamic Crafting System**: Transform, combine, and improve items
- **Real-time Multiplayer**: WebSocket-based client-server architecture

## Core Game Loop
1. Pull random items from the dispenser
2. Craft and modify items at the workbench
3. Store items in inventory chest or sell them to the appraiser

(from .kiro/steering/product.md in kirodotdev/spirit-of-kiro)`,
      documentation: {
        state: 'section',
        label: 'Steering — Project Steering Files',
        url: 'https://kiro.dev/docs/steering/#project-steering-files',
      },
    },
    {
      id: 'hook',
      path: '.kiro/hooks/<name>.json',
      summary:
        'A trigger, a matcher, and an action. This is the file whose mere presence makes steps run without anyone asking.',
      condition: 'Written only when you create a hook. Any `.json` filename works.',
      example: `{
  "version": "v1",
  "hooks": [{
    "name": "Lint on save",
    "trigger": "PostFileSave",
    "matcher": "\\\\.(ts|tsx)$",
    "action": { "type": "command", "command": "npx eslint --fix" }
  }]
}`,
      documentation: {
        state: 'section',
        label: 'Hooks — Hook File Schema',
        url: 'https://kiro.dev/docs/hooks/#hook-file-schema',
      },
    },
    {
      id: 'mcp',
      path: '.kiro/settings/mcp.json',
      summary: 'The MCP servers this project may call, and which of their tools are pre-approved.',
      condition: 'Written only when you configure MCP for the project.',
      example: `{
  "mcpServers": {
    "web-search": {
      "command": "uvx",
      "args": ["mcp-server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-api-key-here"
      },
      "disabled": false,
      "autoApprove": ["search"]
    }
  }
}`,
      documentation: {
        state: 'section',
        label: 'Configuration — File Paths',
        url: 'https://kiro.dev/docs/configuration/#file-paths',
      },
    },
  ],
  verification: {
    state: 'checked',
    source: 'Kiro documentation, with artifact examples from Kiro’s own public repositories',
    url: 'https://kiro.dev/docs/specs/',
    checkedOn: '2026-09-07',
  },
};

const specKit: Tool = {
  id: 'spec-kit',
  name: 'GitHub Spec Kit',
  tagline: 'A constitution first, then a numbered spec folder per feature.',
  summary:
    'Spec Kit installs a set of slash commands and templates into your project, then walks a feature from principles through specification, plan, and tasks to implementation, with each feature getting its own numbered folder and branch.',
  steps: [
    {
      id: 'init',
      name: 'Initialise the project',
      purpose:
        'Installs the command definitions, scripts, and templates into the project and wires them up for your AI assistant.',
      trigger: {
        kind: 'requested',
        detail: 'You run the `specify` CLI in your terminal, before any of the slash commands exist.',
      },
      variants: ['The commands are installed per assistant, so the file that defines them differs by tool.'],
      writes: ['templates', 'agent-commands'],
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'constitution',
      name: 'Constitution',
      purpose:
        'Records the principles the project holds to — the standards that every later spec, plan, and review is expected to respect.',
      trigger: { kind: 'requested', detail: 'You run the constitution command in your AI assistant.' },
      variants: ['Written once and amended later, rather than repeated per feature.'],
      writes: ['constitution'],
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'specify',
      name: 'Specify',
      purpose:
        'Turns a description of what you want into a specification of the feature: user scenarios and testable requirements, deliberately avoiding technical choices.',
      trigger: { kind: 'requested', detail: 'You run the specify command with a description of the feature.' },
      variants: ['Each feature gets its own numbered folder, and a matching branch.'],
      writes: ['spec'],
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'clarify',
      name: 'Clarify',
      purpose:
        'Works through the parts of the specification that are ambiguous, asking you targeted questions and folding your answers back into the spec.',
      trigger: { kind: 'requested', detail: 'You run the clarify command after the spec exists.' },
      variants: [
        'Optional, and intended before planning: the point is to settle open questions while they are still cheap.',
      ],
      writes: ['spec'],
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'plan',
      name: 'Plan',
      purpose:
        'Chooses the technical approach — stack, architecture, data shapes, and contracts — and writes it out alongside the research behind it.',
      trigger: { kind: 'requested', detail: 'You run the plan command, usually with your stack preferences.' },
      variants: [
        'The supporting documents vary with the feature: a plan with no external interface produces no contracts.',
      ],
      writes: ['plan', 'research', 'data-model', 'contracts', 'quickstart'],
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'tasks',
      name: 'Tasks',
      purpose: 'Breaks the plan into an ordered, numbered task list, marking which tasks can run in parallel.',
      trigger: { kind: 'requested', detail: 'You run the tasks command once the plan is settled.' },
      variants: [],
      writes: ['tasks'],
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'analyze',
      name: 'Analyze',
      purpose:
        'Reads the specification, plan, and tasks against each other and reports where they disagree or where the constitution is being violated.',
      trigger: { kind: 'requested', detail: 'You run the analyze command after tasks exist.' },
      variants: ['Optional, and read-only: it reports rather than edits.'],
      writes: [],
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'checklist',
      name: 'Checklist',
      purpose: 'Generates quality checklists for the feature so the specification can be reviewed against them.',
      trigger: { kind: 'requested', detail: 'You run the checklist command.' },
      variants: ['Optional; nothing later in the flow depends on it.'],
      writes: ['checklist'],
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'implement',
      name: 'Implement',
      purpose: 'Works through the task list, writing the code and marking tasks off as they are finished.',
      trigger: { kind: 'requested', detail: 'You run the implement command.' },
      variants: ['Tasks marked as parallel-safe may be carried out together.'],
      writes: ['tasks'],
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
  ],
  files: [
    {
      id: 'constitution',
      path: '.specify/memory/constitution.md',
      summary:
        'The project’s standing principles, carried into every feature rather than restated in each one.',
      example: `# Project Constitution

## Core Principles

### I. Library-First
Every feature starts as a standalone library with a clear purpose.
No organisational-only libraries.

### II. Test-First (NON-NEGOTIABLE)
Tests are written and approved before implementation begins.
Red, green, refactor, in that order.

## Governance

Amendments require documentation and a migration plan.
All reviews verify compliance with these principles.`,
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'templates',
      path: '.specify/templates/',
      summary:
        'The templates each command fills in — one per artifact — plus the scripts the commands call to create branches and folders.',
      example: `.specify/
├── memory/
│   └── constitution.md
├── scripts/
├── templates/
│   ├── spec-template.md
│   ├── plan-template.md
│   └── tasks-template.md`,
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'agent-commands',
      path: '.claude/commands/',
      summary:
        'The slash command definitions themselves, written into whichever assistant you chose at setup.',
      condition:
        'The location depends on the assistant: a different directory is written for each supported tool.',
      example: `.claude/commands/
├── speckit.constitution.md
├── speckit.specify.md
├── speckit.plan.md
├── speckit.tasks.md
└── speckit.implement.md`,
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'spec',
      path: 'specs/###-feature-name/spec.md',
      summary:
        'What the feature must do, in user scenarios and numbered functional requirements, with open questions left visibly marked.',
      example: `# Feature Specification: Photo Albums

## User Scenarios & Testing

### Primary User Story
A user groups photos into albums and reorders them by dragging,
without any nesting of albums inside albums.

## Requirements

- **FR-001**: System MUST let users create named albums.
- **FR-002**: System MUST let users drag photos to reorder them.
- **FR-003**: System MUST persist album order between sessions.
- **FR-004**: System MUST [NEEDS CLARIFICATION: retention period
  for deleted albums not specified]`,
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'plan',
      path: 'specs/###-feature-name/plan.md',
      summary: 'The technical approach for this feature: stack, structure, and how the work is sequenced.',
      example: `# Implementation Plan: Photo Albums

## Technical Context
Language: TypeScript 5.x
Storage: local SQLite via Prisma
Testing: Vitest

## Constitution Check
- Library-First: album logic lives in packages/albums
- Test-First: contract tests written before handlers

## Project Structure
packages/albums/
tests/contract/`,
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'research',
      path: 'specs/###-feature-name/research.md',
      summary: 'The options weighed while planning and the reasoning behind the choices made.',
      condition: 'Written by the plan step when the feature raises questions that need investigating.',
      example: `# Research: Photo Albums

## Decision: SQLite over IndexedDB
Rationale: the app already ships a SQLite file for settings, and
album ordering needs transactional writes.
Alternatives considered: IndexedDB (no transactions across stores),
flat JSON (rewrites the whole file per reorder).`,
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'data-model',
      path: 'specs/###-feature-name/data-model.md',
      summary: 'The entities the feature introduces, their fields, and the rules that constrain them.',
      condition: 'Written by the plan step when the feature introduces or changes stored data.',
      example: `# Data Model: Photo Albums

## Album
- id: uuid
- name: string, 1-80 characters
- position: integer, unique within owner
- createdAt: timestamp

## Rules
- An album cannot contain another album.
- Deleting an album does not delete its photos.`,
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'contracts',
      path: 'specs/###-feature-name/contracts/',
      summary: 'The interface the feature exposes, written out so tests can be generated against it.',
      condition: 'Written by the plan step only when the feature exposes an interface such as an API.',
      example: `contracts/
└── albums-api.yaml

paths:
  /albums:
    post:
      summary: Create an album
      responses:
        "201": { description: Album created }
        "409": { description: Name already in use }`,
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'quickstart',
      path: 'specs/###-feature-name/quickstart.md',
      summary: 'How to exercise the finished feature, used as the manual validation pass.',
      condition: 'Written by the plan step alongside the other supporting documents.',
      example: `# Quickstart: Photo Albums

1. Run \`npm run dev\` and open the library view.
2. Create an album called "Holiday".
3. Drag two photos into it, then reload the page.
4. The album and its order are still there.`,
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'tasks',
      path: 'specs/###-feature-name/tasks.md',
      summary:
        'The numbered task list, where a marker shows which tasks touch separate files and can therefore run at the same time.',
      example: `# Tasks: Photo Albums

- [x] T001 Create packages/albums with its test harness
- [x] T002 [P] Write contract test for POST /albums
- [ ] T003 [P] Write contract test for GET /albums
- [ ] T004 Implement Album model in packages/albums/model.ts
- [ ] T005 Implement POST /albums handler
- [ ] T006 Run quickstart.md end to end`,
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
    {
      id: 'checklist',
      path: 'specs/###-feature-name/checklists/',
      summary: 'Quality checklists the specification is reviewed against.',
      condition: 'Written only when you run the checklist command.',
      example: `# Requirements Checklist

- [ ] Every requirement is testable as written
- [ ] No requirement names a technology choice
- [ ] All [NEEDS CLARIFICATION] markers are resolved
- [ ] Success criteria are measurable`,
      documentation: {
        state: 'page',
        label: 'github/spec-kit',
        url: 'https://github.com/github/spec-kit',
      },
    },
  ],
  verification: {
    state: 'unverified',
    note: 'Written from prior knowledge of Spec Kit rather than read from its documentation, so command names, paths, and example content may have drifted. Every link here points at the repository rather than a specific section.',
    writtenOn: '2026-09-08',
  },
};

export const tools: Tool[] = [openspec, specKit, kiro];
