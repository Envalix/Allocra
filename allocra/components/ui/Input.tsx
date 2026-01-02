/**
 * Input Component
 *
 * Mobile-first form input with DaisyUI styling.
 * Supports various input types, labels, and validation states.
 */

import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputSize?: 'xs' | 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  xs: 'input-xs',
  sm: 'input-sm',
  md: '',
  lg: 'input-lg',
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      inputSize = 'md',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name || `input-${Math.random().toString(36).slice(2)}`;

    return (
      <div className="form-control w-full">
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className="label">
            <span className="label-text font-medium">{label}</span>
          </label>
        )}

        {/* Input wrapper for icons */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
            className={`
              input input-bordered w-full
              ${sizeClasses[inputSize]}
              ${error ? 'input-error' : ''}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${className}
            `.trim()}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Helper text or error message */}
        {(helperText || error) && (
          <label className="label">
            {error ? (
              <span id={`${inputId}-error`} className="label-text-alt text-error">
                {error}
              </span>
            ) : (
              <span id={`${inputId}-helper`} className="label-text-alt text-base-content/60">
                {helperText}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
