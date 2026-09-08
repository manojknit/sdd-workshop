/**
 * The shape of every fact the site displays about an SDD tool.
 *
 * All five views read this one module, so a fact is stated here once and
 * rendered wherever it is needed.
 */

/**
 * Documentation is a state rather than an optional address: "nobody has
 * filled this in yet" and "this step genuinely has no documentation" are
 * different things, and readers are shown the difference.
 */
export type DocLink =
  | { state: 'section'; label: string; url: string }
  | { state: 'page'; label: string; url: string }
  | { state: 'none'; note: string };

export interface StepTrigger {
  /** `requested` when a person invokes the step, `automatic` when the tool fires it unasked. */
  kind: 'requested' | 'automatic';
  /** How the step is triggered in practice, e.g. the command a person types. */
  detail: string;
}

export interface ToolStep {
  id: string;
  name: string;
  /** What the step does, in plain English. */
  purpose: string;
  trigger: StepTrigger;
  /** Documented alternatives that reorder, replace, or skip this step. */
  variants: string[];
  /** Ids of the files in this tool's `files` list that this step writes. */
  writes: string[];
  documentation: DocLink;
}

export interface ToolFile {
  id: string;
  /** Relative path from the project root; the folder tree is derived from it. */
  path: string;
  summary: string;
  /** Set only when the tool writes this file some of the time; states when. */
  condition?: string;
  /** Real content from the tool's own documentation or a real run of it. */
  example: string;
  documentation: DocLink;
}

/**
 * Whether a tool's facts were read from its documentation or written from
 * memory. A reader is told which, rather than being shown a date that implies
 * a check nobody made.
 */
export type Verification =
  | {
      state: 'checked';
      /** The source the tool's information was checked against. */
      source: string;
      /** Present when the source is published at a web address. */
      url?: string;
      /** ISO date the check was made. */
      checkedOn: string;
    }
  | {
      state: 'unverified';
      /** Where the content came from instead. */
      note: string;
      /** ISO date the content was written. */
      writtenOn: string;
    };

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  /** Why this tool is in the comparison. */
  summary: string;
  /** In the order the tool performs them. */
  steps: ToolStep[];
  files: ToolFile[];
  verification: Verification;
}
