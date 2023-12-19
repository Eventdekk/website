import React, { useState } from "react";

const SearchBar = (props) => {
  const { onSearch } = props;
  const [value, setValue] = useState("Enter search...");

  const searchHandler = (event) => {
    const { target } = event;
    setValue(target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Here, we call the onSearch function and pass the value
      onSearch(value);
    }
  };
  return (
    <div className="relative w-full text-gray-600 dark:text-slate-300">
      <input
        type="text"
        placeholder={value}
        className="border bg-slate-100 dark:bg-midnight2 h-10 px-5 pr-10 w-full rounded-full text-sm dark:text-gray-300 dark:border-midnight focus:border-primary dark:focus:border-secondary focus:outline-none focus:ring ring-offset focus:ring-primary dark:focus:ring-secondary dark:placeholder-gray-400 focus:ring-opacity-20 dark:focus:ring-opacity-20"
        onChange={(event) => searchHandler(event)}
        onKeyDown={handleKeyDown}
      />

      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <svg
          className="h-4 w-4 fill-current dark:fill-slate-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
