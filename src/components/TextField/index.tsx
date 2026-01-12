import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  name,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 rounded-lg text-sm
          border
          bg-white dark:bg-[#2c2c2c]
          text-gray-800 dark:text-white
          focus:outline-none focus:ring-1
          disabled:opacity-60 disabled:cursor-not-allowed
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-[#333333] focus:ring-black dark:focus:ring-white"
          }
        `}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextInput;
