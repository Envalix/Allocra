/**
 * Select Component
 *
 * Mobile-first dropdown select with DaisyUI styling.
 */

import { type SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  selectSize?: 'xs' | 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  xs: 'select-xs',
  sm: 'select-sm',
  md: '',
  lg: 'select-lg',
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      options,
      placeholder,
      selectSize = 'md',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || props.name || `select-${Math.random().toString(36).slice(2)}`;

    return (
      <div className="form-control w-full">
        {/* Label */}
        {label && (
          <label htmlFor={selectId} className="label">
            <span className="label-text font-medium">{label}</span>
          </label>
        )}

        {/* Select element */}
        <select
          ref={ref}
          id={selectId}
          className={`
            select select-bordered w-full
            ${sizeClasses[selectSize]}
            ${error ? 'select-error' : ''}
            ${className}
          `.trim()}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Helper text or error message */}
        {(helperText || error) && (
          <label className="label">
            {error ? (
              <span id={`${selectId}-error`} className="label-text-alt text-error">
                {error}
              </span>
            ) : (
              <span id={`${selectId}-helper`} className="label-text-alt text-base-content/60">
                {helperText}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
