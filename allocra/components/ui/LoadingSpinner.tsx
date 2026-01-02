/**
 * LoadingSpinner Component
 *
 * Loading indicator with various sizes and styles.
 */

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  xs: 'loading-xs',
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
};

const variantClasses = {
  spinner: 'loading-spinner',
  dots: 'loading-dots',
  ring: 'loading-ring',
  ball: 'loading-ball',
  bars: 'loading-bars',
  infinity: 'loading-infinity',
};

export default function LoadingSpinner({
  size = 'md',
  variant = 'spinner',
  className = '',
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <span
        className={`loading text-primary ${sizeClasses[size]} ${variantClasses[variant]}`}
        aria-label="Loading"
      />
      {text && <span className="text-sm text-base-content/70">{text}</span>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100/80 backdrop-blur-sm z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

// Inline loading for buttons or small areas
export function LoadingDots({ className = '' }: { className?: string }) {
  return (
    <span className={`loading loading-dots loading-xs ${className}`} aria-label="Loading" />
  );
}
