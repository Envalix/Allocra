/**
 * Badge Component
 *
 * Small label/tag component for status indicators and labels.
 */

import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  outline?: boolean;
  className?: string;
}

const variantClasses = {
  neutral: 'badge-neutral',
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  ghost: 'badge-ghost',
};

const sizeClasses = {
  xs: 'badge-xs',
  sm: 'badge-sm',
  md: '',
  lg: 'badge-lg',
};

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  outline = false,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        badge
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${outline ? 'badge-outline' : ''}
        ${className}
      `.trim()}
    >
      {children}
    </span>
  );
}

// Status badge for DCA plan status
export function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    DRAFT: { variant: 'ghost', label: 'Draft' },
    ACTIVE: { variant: 'success', label: 'Active' },
    PAUSED: { variant: 'warning', label: 'Paused' },
    COMPLETED: { variant: 'info', label: 'Completed' },
    CANCELLED: { variant: 'error', label: 'Cancelled' },
  };

  const config = statusConfig[status] || { variant: 'neutral', label: status };

  return <Badge variant={config.variant}>{config.label}</Badge>;
}

// Price change badge
export function PriceChangeBadge({ change, changePercent }: { change: number; changePercent: number }) {
  const isPositive = change >= 0;
  
  return (
    <Badge variant={isPositive ? 'success' : 'error'} size="sm">
      {isPositive ? '+' : ''}
      {changePercent.toFixed(2)}%
    </Badge>
  );
}

// Plan type badge
export function PlanTypeBadge({ type }: { type: 'TOTAL_INVESTMENT' | 'MONTHLY' }) {
  const config = {
    TOTAL_INVESTMENT: { variant: 'secondary' as const, label: 'Total Investment' },
    MONTHLY: { variant: 'primary' as const, label: 'Monthly' },
  };

  const { variant, label } = config[type] || { variant: 'neutral' as const, label: type };

  return (
    <Badge variant={variant} outline>
      {label}
    </Badge>
  );
}
