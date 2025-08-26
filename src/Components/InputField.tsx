import React, { useState } from 'react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password';
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  loading?: boolean;
  theme?: 'light' | 'dark';
}

const sizeClasses = {
  sm: 'text-sm px-2 py-1',
  md: 'text-base px-3 py-2',
  lg: 'text-lg px-4 py-2.5',
};

const variantClasses = {
  outlined: 'border border-gray-300 focus:ring-2 focus:ring-blue-500',
  filled: 'bg-gray-100 border border-transparent focus:ring-2 focus:ring-blue-500',
  ghost: 'bg-transparent border border-transparent focus:ring-2 focus:ring-blue-500',
};

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  showPasswordToggle = false,
  loading = false,
  theme = 'light',
}) => {
  const [inputType, setInputType] = useState(type);

  const handleClear = () => {
    onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  const togglePassword = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const inputBaseClasses = `
    w-full rounded-md shadow-sm transition
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-50' : ''}
    ${invalid ? 'border-red-500 ring-red-500' : ''}
    ${theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400' : ''}
  `;

  return (
    <div className={`space-y-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      {label && (
        <label className="block text-sm font-medium" htmlFor={label}>
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={label}
          type={inputType}
          className={inputBaseClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled || loading}
        />

        {showClearButton && value && !disabled && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white"
          >
            ×
          </button>
        )}

        {showPasswordToggle && type === 'password' && !disabled && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white"
          >
            {inputType === 'password' ? '👁️' : '🙈'}
          </button>
        )}

        {loading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </div>
        )}
      </div>

      {invalid && errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : (
        helperText && <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default InputField;
