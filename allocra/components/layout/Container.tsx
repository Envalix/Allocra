/**
 * Container Component
 *
 * Responsive container with consistent padding and max-width.
 * Mobile-first with proper spacing on all screen sizes.
 */

import { type ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  paddingX?: boolean;
  paddingY?: boolean;
}

const sizeClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export default function Container({
  children,
  className = '',
  size = 'lg',
  paddingX = true,
  paddingY = true,
}: ContainerProps) {
  return (
    <div
      className={`
        w-full mx-auto
        ${sizeClasses[size]}
        ${paddingX ? 'px-4 sm:px-6 lg:px-8' : ''}
        ${paddingY ? 'py-6 sm:py-8 lg:py-12' : ''}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}
