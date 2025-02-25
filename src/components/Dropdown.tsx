import { useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface DropdownProps<T> {
  label: string;
  options: T[];
  displayKey?: string;
  value: T;
  onSelect: (option: T) => void;
}

function getValue<T>(optionKey: string | undefined, option: T) {
  return optionKey &&
    typeof option === "object" &&
    option !== null &&
    optionKey in option
    ? String((option as Record<string, unknown>)[optionKey])
    : String(option);
}

function Dropdown<T>({
  label,
  options,
  displayKey,
  value,
  onSelect,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const fieldWrapperRef = useOutsideClick(() => {
    setIsOpen(false);
  });

  const handleSelect = (option: T) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={fieldWrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {`${label}: ${getValue(displayKey, value)}`}{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        className={`z-10 ${
          isOpen ? "" : "hidden"
        } absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
      >
        <ul className="text-sm text-gray-700 dark:text-gray-200">
          {options.map((option) => {
            const value = getValue(displayKey, option);

            return (
              <li key={value}>
                <button
                  className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition"
                  onClick={() => handleSelect(option)}
                >
                  {value}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
