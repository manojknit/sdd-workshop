import type { Tool } from '../data/types';
import { buildTree } from '../data/relations';
import { Tree } from './ArtifactView';
import { VerificationStamp } from './VerificationStamp';

interface ComparisonViewProps {
  tools: Tool[];
  lens: 'flow' | 'artifacts';
  onOpenTool: (toolId: string) => void;
}

export function ComparisonView({ tools, lens, onOpenTool }: ComparisonViewProps) {
  return (
    <div className="comparison">
      {tools.map((tool) => (
        <section key={tool.id} className="column">
          <header className="column-head">
            <h3>{tool.name}</h3>
            <p className="tagline">{tool.tagline}</p>
            <VerificationStamp verification={tool.verification} />
            <button type="button" className="link-button" onClick={() => onOpenTool(tool.id)}>
              Open {tool.name} on its own
            </button>
          </header>

          {lens === 'flow' ? (
            <ol className="compare-flow">
              {tool.steps.map((step) => (
                <li key={step.id}>
                  <span className="compare-step">{step.name}</span>
                  {step.trigger.kind === 'automatic' ? (
                    <span className="tag tag-automatic">automatic</span>
                  ) : null}
                </li>
              ))}
            </ol>
          ) : (
            <Tree nodes={buildTree(tool.files)} />
          )}
        </section>
      ))}
    </div>
  );
}
