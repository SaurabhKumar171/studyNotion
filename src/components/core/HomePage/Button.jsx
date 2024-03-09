import React from 'react'
import {Link} from "react-router-dom"

const Button = ({children, active, linkto, customClasses}) => {
  return (
    <Link to={linkto}>

        <div className={`text-center text-[13px] py-3 rounded-md font-bold
        ${active ? "bg-yellow-50 text-black":" bg-richblack-800"}
        hover:scale-95 transition-all duration-200
        ${customClasses}
        `}>
            {children}
        </div>

    </Link>
  )
}

export default Button
