import { useEffect, memo } from "react";

const DropdownMenu = memo(
  ({
    aria_label,
    onClick,
    display_value,
    isDropdownOpen,
    listItem,
    dropdownRef
  }) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          isDropdownOpen &&
          dropdownRef?.current &&
          !dropdownRef?.current.contains(event.target)
        ) {
          onClick();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isDropdownOpen, onClick, dropdownRef]);

    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          aria-label={aria_label}
          onClick={onClick}
          className="flex flex-nowrap gap-2 items-center p-1"
        >
          {display_value}
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-50">
            {listItem}
          </div>
        )}
      </div>
    );
  }
);

export default DropdownMenu;
