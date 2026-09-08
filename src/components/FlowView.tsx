import type { Tool, ToolStep } from '../data/types';
import { fileById, stepById } from '../data/relations';
import { Documentation } from './Documentation';

interface FlowViewProps {
  tool: Tool;
  selectedStepId: string;
  onSelectStep: (stepId: string) => void;
  onOpenFile: (fileId: string) => void;
}

export function FlowView({ tool, selectedStepId, onSelectStep, onOpenFile }: FlowViewProps) {
  const selected = stepById(tool, selectedStepId) ?? tool.steps[0];

  return (
    <div className="split">
      <ol className="flow" aria-label={`${tool.name} workflow steps`}>
        {tool.steps.map((step, index) => (
          <li key={step.id} className="flow-item">
            <button
              type="button"
              className={`flow-step${step.id === selected.id ? ' is-selected' : ''}`}
              onClick={() => onSelectStep(step.id)}
              aria-current={step.id === selected.id}
            >
              <span className="flow-index">{index + 1}</span>
              <span className="flow-name">{step.name}</span>
              <span className={`tag tag-${step.trigger.kind}`}>
                {step.trigger.kind === 'automatic' ? 'automatic' : 'you ask'}
              </span>
            </button>
            {index < tool.steps.length - 1 ? <span className="flow-arrow" aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
      <StepDetail tool={tool} step={selected} onOpenFile={onOpenFile} />
    </div>
  );
}

function StepDetail({
  tool,
  step,
  onOpenFile,
}: {
  tool: Tool;
  step: ToolStep;
  onOpenFile: (fileId: string) => void;
}) {
  return (
    <article className="detail" aria-label={`${step.name} detail`}>
      <h3>{step.name}</h3>
      <p className="detail-lead">{step.purpose}</p>

      <section>
        <h4>How it is triggered</h4>
        <p>
          {step.trigger.kind === 'automatic'
            ? 'This step runs without being requested. '
            : ''}
          {step.trigger.detail}
        </p>
      </section>

      <section>
        <h4>Files it writes</h4>
        {step.writes.length === 0 ? (
          <p className="muted">This step writes no files.</p>
        ) : (
          <ul className="link-list">
            {step.writes.map((fileId) => {
              const file = fileById(tool, fileId);
              if (!file) return null;
              return (
                <li key={fileId}>
                  <button type="button" className="link-button" onClick={() => onOpenFile(fileId)}>
                    {file.path}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {step.variants.length > 0 ? (
        <section>
          <h4>Documented variants</h4>
          <ul>
            {step.variants.map((variant) => (
              <li key={variant}>{variant}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <Documentation link={step.documentation} subject="step" />
    </article>
  );
}
