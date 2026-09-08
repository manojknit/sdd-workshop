import type { Tool, ToolFile } from '../data/types';
import { buildTree, fileById, stepsWriting, type TreeNode } from '../data/relations';
import { Documentation } from './Documentation';

interface ArtifactViewProps {
  tool: Tool;
  selectedFileId: string;
  onSelectFile: (fileId: string) => void;
  onOpenStep: (stepId: string) => void;
}

export function ArtifactView({ tool, selectedFileId, onSelectFile, onOpenStep }: ArtifactViewProps) {
  const selected = fileById(tool, selectedFileId) ?? tool.files[0];

  return (
    <div className="split">
      <div className="tree-panel">
        <p className="tree-root">{tool.name} writes</p>
        <Tree nodes={buildTree(tool.files)} selectedFileId={selected.id} onSelectFile={onSelectFile} />
      </div>
      <FileDetail tool={tool} file={selected} onOpenStep={onOpenStep} />
    </div>
  );
}

export function Tree({
  nodes,
  selectedFileId,
  onSelectFile,
}: {
  nodes: TreeNode[];
  selectedFileId?: string;
  onSelectFile?: (fileId: string) => void;
}) {
  return (
    <ul className="tree">
      {nodes.map((node) => (
        <li key={node.path}>
          {node.fileId && onSelectFile ? (
            <button
              type="button"
              className={`tree-entry${node.fileId === selectedFileId ? ' is-selected' : ''}`}
              onClick={() => onSelectFile(node.fileId as string)}
              aria-current={node.fileId === selectedFileId}
            >
              {node.name}
            </button>
          ) : (
            <span className={node.children.length > 0 ? 'tree-dir' : 'tree-entry-static'}>
              {node.name}
              {node.children.length > 0 ? '/' : ''}
            </span>
          )}
          {node.children.length > 0 ? (
            <Tree nodes={node.children} selectedFileId={selectedFileId} onSelectFile={onSelectFile} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function FileDetail({
  tool,
  file,
  onOpenStep,
}: {
  tool: Tool;
  file: ToolFile;
  onOpenStep: (stepId: string) => void;
}) {
  const writers = stepsWriting(tool, file.id);

  return (
    <article className="detail" aria-label={`${file.path} detail`}>
      <h3 className="path">{file.path}</h3>
      <p className="detail-lead">{file.summary}</p>

      {file.condition ? (
        <p className="condition">
          <span className="doc-label">Written only when</span>
          {file.condition}
        </p>
      ) : null}

      <section>
        <h4>Written by</h4>
        {writers.length === 0 ? (
          <p className="muted">No step in this flow writes this file.</p>
        ) : (
          <ul className="link-list">
            {writers.map((step) => (
              <li key={step.id}>
                <button type="button" className="link-button" onClick={() => onOpenStep(step.id)}>
                  {step.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h4>Example content</h4>
        <pre className="example">
          <code>{file.example}</code>
        </pre>
      </section>

      <Documentation link={file.documentation} subject="file" />
    </article>
  );
}
