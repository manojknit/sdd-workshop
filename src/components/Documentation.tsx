import type { DocLink } from '../data/types';

/**
 * Renders all three documentation states, including the state where the tool
 * documents a step or file nowhere at all.
 */
export function Documentation({ link, subject }: { link: DocLink; subject: string }) {
  if (link.state === 'none') {
    return (
      <p className="doc doc-none">
        <span className="doc-label">Documentation</span>
        <span>No documentation exists for this {subject}. {link.note}</span>
      </p>
    );
  }

  return (
    <p className="doc">
      <span className="doc-label">
        {link.state === 'section' ? 'Documentation for this ' + subject : 'Documentation page'}
      </span>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
      {link.state === 'page' ? (
        <span className="doc-caveat">The page covers more than this {subject}.</span>
      ) : null}
    </p>
  );
}
