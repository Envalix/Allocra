/**
 * Stats Component
 *
 * Display statistics in a clean, mobile-friendly format.
 * Perfect for dashboard metrics and plan summaries.
 */

import { type ReactNode } from 'react';

interface StatProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export default function Stat({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className = '',
}: StatProps) {
  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-base-content/50',
  };

  const trendIcons = {
    up: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    ),
    down: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ),
    neutral: null,
  };

  return (
    <div className={`stat ${className}`}>
      {icon && <div className="stat-figure text-primary">{icon}</div>}
      <div className="stat-title text-base-content/60">{title}</div>
      <div className="stat-value text-2xl sm:text-3xl">{value}</div>
      {(description || (trend && trendValue)) && (
        <div className="stat-desc">
          {trend && trendValue && (
            <span className={`inline-flex items-center gap-1 ${trendColors[trend]}`}>
              {trendIcons[trend]}
              {trendValue}
            </span>
          )}
          {description && !trend && <span>{description}</span>}
        </div>
      )}
    </div>
  );
}

// Stats group container
interface StatsProps {
  children: ReactNode;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export function Stats({
  children,
  direction = 'horizontal',
  className = '',
}: StatsProps) {
  return (
    <div
      className={`
        stats shadow bg-base-100 w-full
        ${direction === 'vertical' ? 'stats-vertical' : 'stats-horizontal overflow-x-auto'}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}

// Common stat presets
export function MoneyStats({
  totalInvested,
  currentValue,
  averagePrice,
}: {
  totalInvested: number;
  currentValue?: number;
  averagePrice?: number;
}) {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const gain = currentValue ? currentValue - totalInvested : 0;
  const gainPercent = totalInvested > 0 ? (gain / totalInvested) * 100 : 0;

  return (
    <Stats direction="vertical" className="sm:stats-horizontal">
      <Stat title="Total Invested" value={formatCurrency(totalInvested)} />
      {currentValue && (
        <Stat
          title="Current Value"
          value={formatCurrency(currentValue)}
          trend={gain >= 0 ? 'up' : 'down'}
          trendValue={`${gain >= 0 ? '+' : ''}${gainPercent.toFixed(2)}%`}
        />
      )}
      {averagePrice && (
        <Stat title="Avg. Price" value={formatCurrency(averagePrice)} />
      )}
    </Stats>
  );
}
