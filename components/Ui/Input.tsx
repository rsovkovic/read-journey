import React, { forwardRef, InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  children?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, children, className = '', ...props }, ref) => {
    const id = useId();

    const hasError = !!error;
    const isSuccess =
      !error && props.value && props.value.toString().length > 0;

    return (
      <div className="flex w-full flex-col gap-1">
        <div
          className={`flex items-center rounded-xl border bg-(--input-bg) px-4 py-3.5 transition-all ${hasError ? 'border-(--error-red)' : isSuccess ? 'border-[#3CBF61]' : 'border-white/10 focus-within:border-white'} ${className}`}
        >
          <label
            htmlFor={id}
            className="mr-2 cursor-pointer text-sm font-medium whitespace-nowrap text-(--text-secondary)"
          >
            {label}
          </label>

          <input
            id={id}
            ref={ref}
            {...props}
            className="placeholder:text-foreground text-foreground w-full [appearance:textfield] border-none bg-transparent p-0 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />

          <div className="flex items-center gap-2">
            {hasError && (
              <svg width="20" height="20" className="text-(--error-red)">
                <use href="/sprite.svg#icon-error" />
              </svg>
            )}

            {!hasError && isSuccess && (
              <svg width="20" height="20" className="text-[#3CBF61]">
                <use href="/sprite.svg#icon-success" />
              </svg>
            )}

            {!hasError && !isSuccess && children}
          </div>
        </div>

        {error && (
          <p className="ml-2 text-[10px] text-(--error-red) italic">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
