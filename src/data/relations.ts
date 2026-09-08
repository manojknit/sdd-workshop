import type { Tool, ToolFile, ToolStep } from './types';

/**
 * Steps store the ids of the files they write; the reverse direction is
 * derived here so the two can never contradict each other.
 */
export function stepsWriting(tool: Tool, fileId: string): ToolStep[] {
  return tool.steps.filter((step) => step.writes.includes(fileId));
}

export function fileById(tool: Tool, fileId: string): ToolFile | undefined {
  return tool.files.find((file) => file.id === fileId);
}

export function stepById(tool: Tool, stepId: string): ToolStep | undefined {
  return tool.steps.find((step) => step.id === stepId);
}

export interface TreeNode {
  name: string;
  path: string;
  /** Set on nodes that correspond to an entry in the tool's file list. */
  fileId?: string;
  children: TreeNode[];
}

/**
 * Turns the flat list of relative paths into the folder structure they imply,
 * so intermediate directories appear even when no entry describes them.
 */
export function buildTree(files: ToolFile[]): TreeNode[] {
  const roots: TreeNode[] = [];

  for (const file of files) {
    const segments = file.path.split('/').filter(Boolean);
    let siblings = roots;
    let prefix = '';

    segments.forEach((segment, index) => {
      prefix = prefix === '' ? segment : `${prefix}/${segment}`;
      let node = siblings.find((candidate) => candidate.name === segment);
      if (!node) {
        node = { name: segment, path: prefix, children: [] };
        siblings.push(node);
      }
      if (index === segments.length - 1) {
        node.fileId = file.id;
      }
      siblings = node.children;
    });
  }

  return roots;
}
