import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) => {
  return (
    <button 
    disabled={disabled}
    onClick={onclick}
    type={type}
    className={`flex flex-row-reverse gap-2 bg-yellow-50 text-black justify-center items-center px-3 font-inter rounded-md text-normal hover:scale-95 transition-all duration-200 py-1 ${customClasses}`}>
        {
            children ? (
                <>
                    <span>
                        {text}
                    </span>
                    {children}
                </>
            ) : (text)
        }
    </button>
  )
}

export default IconBtn
