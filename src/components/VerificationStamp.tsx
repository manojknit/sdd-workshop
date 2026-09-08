import type { Verification } from '../data/types';

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function VerificationStamp({ verification }: { verification: Verification }) {
  if (verification.state === 'unverified') {
    return (
      <p className="verification verification-unverified">
        Not checked against the documentation. {verification.note} Written on{' '}
        <time dateTime={verification.writtenOn}>{formatDate(verification.writtenOn)}</time>
      </p>
    );
  }

  return (
    <p className="verification">
      Verified against{' '}
      {verification.url ? (
        <a href={verification.url} target="_blank" rel="noreferrer">
          {verification.source}
        </a>
      ) : (
        <span>{verification.source}</span>
      )}{' '}
      on <time dateTime={verification.checkedOn}>{formatDate(verification.checkedOn)}</time>
    </p>
  );
}
