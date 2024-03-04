import React from 'react'

const HamburgerSidebar = ({isSmallScreen, isSidebarOpen, handleSidebarToggle}) => {
  return (
    <div 
        className={`
                    ${isSmallScreen? "flex": "hidden"}  
                    flex-col items-start justify-between cursor-pointer py-2 transition-all 
                    ${!isSidebarOpen ? 'duration-800 opacity-100 gap-y-1':'opacity-0 duration-200'}`
                } 
        onClick={() =>handleSidebarToggle(!isSidebarOpen)}
        >
            <div className={`w-[1.6em] ml-8 h-[0.2em] bg-richblack-75 ${!isSidebarOpen ? 'rounded-full':'rounded-normal'}`}></div>
            <div className={`w-[1.6em] ml-8 h-[0.2em] bg-richblack-75 ${!isSidebarOpen ? 'rounded-full':'hidden'}`}></div>
            <div className={`w-[1.6em] ml-8 h-[0.2em] bg-richblack-75 ${!isSidebarOpen ? 'rounded-full':'rounded-normal'}`}></div>
    </div>
    )
}

export default HamburgerSidebar