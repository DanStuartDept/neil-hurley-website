'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <h2 className="font-display text-2xl text-primary">Something went wrong</h2>
      <p className="font-body text-sm text-secondary max-w-[400px]">
        An unexpected error occurred. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="font-body text-xs uppercase tracking-[0.2em] text-accent hover:text-accent-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}
