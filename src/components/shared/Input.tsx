import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export function Input({
  label,
  error,
  multiline,
  rows = 3,
  startAdornment,
  endAdornment,
  className,
  ...props
}: InputProps) {
  const inputClasses = cn(
    'w-full px-4 py-2 rounded-lg border transition-colors',
    error ? 'border-red-500' : 'border-gray-300',
    'focus:outline-none focus:ring-2',
    error ? 'focus:ring-red-500' : 'focus:ring-blue-500',
    'focus:border-transparent',
    startAdornment && 'pl-8',
    endAdornment && 'pr-8',
    className
  );

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {startAdornment && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {startAdornment}
          </div>
        )}
        
        {multiline ? (
          <textarea
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            rows={rows}
            className={inputClasses}
          />
        ) : (
          <input {...props} className={inputClasses} />
        )}
        
        {endAdornment && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {endAdornment}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}