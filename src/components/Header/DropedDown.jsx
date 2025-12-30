import React from 'react'
import {useNavigate} from 'react-router-dom'

function DropDown({
    label,
    options=[],
    className=""

}){

     const navigate = useNavigate();

  const handleChange = (e) => {
    const route = e.target.value;
    if (route) {
      navigate(route);
    //   e.target.value = ""; // Reset dropdown to placeholder
    }}

  return (
    <div className="relative w-full">
      <select
        onChange={handleChange}
        className={` appearance-none
          w-full
          cursor-pointer
          p-0
          pr-6
          hover:text-blue-600
          focus:outline-none
          ${className}`}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.path} value={option.path}>
            {option.name}
          </option>
        ))}
      </select>

      {/* dropdown icon */}
      <svg
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
} 

export default DropDown;