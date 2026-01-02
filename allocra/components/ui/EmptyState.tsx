/**
 * EmptyState Component
 *
 * Display for empty lists, no data, or zero states.
 * Mobile-first design with optional action button.
 */

import { type ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

// Default empty icon
const DefaultIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
    />
  </svg>
);

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-12 px-4 ${className}`}>
      {/* Icon */}
      <div className="text-base-content/30 mb-4">
        {icon || <DefaultIcon />}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-base-content mb-2">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-base-content/60 max-w-sm mb-6">{description}</p>
      )}

      {/* Action */}
      {action}
    </div>
  );
}

// Predefined empty states for common scenarios
export function NoPlansEmptyState({ onCreatePlan }: { onCreatePlan?: () => void }) {
  return (
    <EmptyState
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      }
      title="No DCA Plans Yet"
      description="Start your investment journey by creating your first Dollar Cost Averaging plan."
      action={
        onCreatePlan && (
          <button onClick={onCreatePlan} className="btn btn-primary">
            Create Your First Plan
          </button>
        )
      }
    />
  );
}

export function NoAlertsEmptyState() {
  return (
    <EmptyState
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      }
      title="No Alerts Yet"
      description="You'll see your DCA alerts and notifications here once your plans start triggering."
    />
  );
}

export function NoStocksFoundEmptyState({ query }: { query?: string }) {
  return (
    <EmptyState
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      }
      title="No Stocks Found"
      description={query ? `No results for "${query}". Try a different search term.` : 'Search for a stock to get started.'}
    />
  );
}
