import { useState } from 'react';
import { tools } from './data/tools';
import { FlowView } from './components/FlowView';
import { ArtifactView } from './components/ArtifactView';
import { ComparisonView } from './components/ComparisonView';
import { VerificationStamp } from './components/VerificationStamp';

type Scope = 'single' | 'all';
type Lens = 'flow' | 'artifacts';

export function App() {
  const [scope, setScope] = useState<Scope>('single');
  const [lens, setLens] = useState<Lens>('flow');
  const [toolId, setToolId] = useState(tools[0].id);
  const [stepId, setStepId] = useState(tools[0].steps[0].id);
  const [fileId, setFileId] = useState(tools[0].files[0].id);

  const tool = tools.find((candidate) => candidate.id === toolId) ?? tools[0];

  function openTool(nextId: string) {
    const next = tools.find((candidate) => candidate.id === nextId) ?? tools[0];
    setToolId(next.id);
    setStepId(next.steps[0].id);
    setFileId(next.files[0].id);
    setScope('single');
  }

  return (
    <div className="page">
      <header className="masthead">
        <h1>Spec-Driven Development tools, side by side</h1>
        <p>
          Three tools that turn an idea into working software through written intent. Follow one
          tool's flow, open the files it writes, or line all three up against each other.
        </p>
      </header>

      <nav className="controls" aria-label="View controls">
        <div className="control-group" role="group" aria-label="Tool">
          {tools.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              className={`chip${scope === 'single' && candidate.id === tool.id ? ' is-active' : ''}`}
              onClick={() => openTool(candidate.id)}
            >
              {candidate.name}
            </button>
          ))}
          <button
            type="button"
            className={`chip chip-wide${scope === 'all' ? ' is-active' : ''}`}
            onClick={() => setScope('all')}
          >
            All three together
          </button>
        </div>

        <div className="control-group" role="group" aria-label="What to show">
          <button
            type="button"
            className={`chip${lens === 'flow' ? ' is-active' : ''}`}
            onClick={() => setLens('flow')}
          >
            Flow
          </button>
          <button
            type="button"
            className={`chip${lens === 'artifacts' ? ' is-active' : ''}`}
            onClick={() => setLens('artifacts')}
          >
            Files
          </button>
        </div>
      </nav>

      {scope === 'all' ? (
        <main>
          <h2>
            {lens === 'flow'
              ? 'Every tool’s flow, side by side'
              : 'Every tool’s files, side by side'}
          </h2>
          <ComparisonView tools={tools} lens={lens} onOpenTool={openTool} />
        </main>
      ) : (
        <main>
          <div className="tool-head">
            <h2>{tool.name}</h2>
            <p className="tagline">{tool.tagline}</p>
            <p>{tool.summary}</p>
            <VerificationStamp verification={tool.verification} />
          </div>

          {lens === 'flow' ? (
            <FlowView
              tool={tool}
              selectedStepId={stepId}
              onSelectStep={setStepId}
              onOpenFile={(nextFileId) => {
                setFileId(nextFileId);
                setLens('artifacts');
              }}
            />
          ) : (
            <ArtifactView
              tool={tool}
              selectedFileId={fileId}
              onSelectFile={setFileId}
              onOpenStep={(nextStepId) => {
                setStepId(nextStepId);
                setLens('flow');
              }}
            />
          )}
        </main>
      )}
    </div>
  );
}
