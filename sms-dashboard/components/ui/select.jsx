import React from "react";

export const Select = ({ children, onValueChange }) => {
  return (
    <div className="relative inline-block w-full">
      <select
        onChange={(e) => onValueChange(e.target.value)}
        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 focus:border-green-500"
      >
        {children}
      </select>
    </div>
  );
};

export const SelectTrigger = ({ children }) => {
  return <option disabled>{children}</option>;
};

export const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export const SelectContent = ({ children }) => {
  return <>{children}</>;
};

export const SelectValue = ({ placeholder }) => {
  return <option disabled selected>{placeholder}</option>;
};