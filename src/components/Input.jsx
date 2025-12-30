import React, { useId } from "react";

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    placeholder,
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="w-full">
            {label && <label
                className="inline-block mb-1 pl-1"
                htmlFor={id}
            > {label} </label>}

            <input
                className={`${className} px-3 py-2 rounded-md bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full `}
                ref={ref}
                id={id}
                {...props}
            ></input>
        </div>
    )
});

export default Input