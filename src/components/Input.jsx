import React, { useId } from "react";
import { IoWarningOutline } from "react-icons/io5";

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    placeholder,
    error="",
    ...props
}, ref) {
    const id = useId();
    

    return (
        <div className="w-full">
            {label && <label
                className=" mb-1 pl-1"
                htmlFor={id}
            > {label} </label>}

             {
                error && (<div className="text-red-600 mb-1 pl-1  flex items-center">

                    <IoWarningOutline className="mr-1" />{error}
                    
                    </div>)
             }

            <input
                className={`${className} px-3 py-2 rounded-md bg-white outline-none text-black focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
                ref={ref}
                id={id}
                {...props}
            ></input>
        </div>
    )
});

export default Input