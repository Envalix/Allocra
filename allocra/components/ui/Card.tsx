/**
 * Card Component
 *
 * Flexible card component with DaisyUI styling.
 */

import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  compact?: boolean;
  glass?: boolean;
}

export default function Card({
  children,
  className = '',
  bordered = true,
  compact = false,
  glass = false,
}: CardProps) {
  return (
    <div
      className={`
        card bg-base-100 shadow-sm
        ${bordered ? 'border border-base-200' : ''}
        ${compact ? 'card-compact' : ''}
        ${glass ? 'glass' : ''}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`card-body ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return <h2 className={`card-title ${className}`}>{children}</h2>;
}

interface CardActionsProps {
  children: ReactNode;
  className?: string;
  justify?: 'start' | 'center' | 'end';
}

export function CardActions({
  children,
  className = '',
  justify = 'end',
}: CardActionsProps) {
  return (
    <div className={`card-actions justify-${justify} ${className}`}>
      {children}
    </div>
  );
}
