import React from "react";

export const InputField = React.forwardRef(
  (
    { type = "text", value, onChange, placeholder, style, name, maxLength },
    ref
  ) => {
    return (
      <input
        type={type}
        ref={ref}
        className={
          style +
          " p-2 w-full bg-gray-100 text-gray-900 rounded-lg dark:text-white dark:bg-midnight2 dark:placeholder-gray-300 "
        }
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        maxLength={maxLength}
      />
    );
  }
);

export function Textarea({ rows, value, onChange, placeholder, style }) {
  return (
    <textarea
      rows={rows}
      class={
        style +
        " resize-none p-2 w-full text-gray-900 bg-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-midnight2  dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      }
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export function Button({ children, onClick, type, style }) {
  return (
    <button
      type={type}
      onClick={onClick}
      class={
        style +
        " text-white bg-secondary hover:bg-blue-800 font-medium rounded-lg w-full sm:w-auto px-4 py-2 text-center dark:bg-secondary dark:hover:bg-blue-700"
      }
    >
      {children}
    </button>
  );
}

export function CloseButton({ style, onClick }) {
  return (
    <div
      className={
        style +
        " text-midnight dark:text-white hover:text-primary dark:hover:text-primary"
      }
      onClick={onClick}
      aria-label="Close"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}
