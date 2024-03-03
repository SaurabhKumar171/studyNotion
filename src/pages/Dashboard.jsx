import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from "react-router-dom"
import Sidebar from '../components/core/Dashboard/Sidebar'
import useOnClickOutside from '../hooks/useOnClickOutside'

const Dashboard = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth );
    const {loading: profileLoading} = useSelector( (state) => state.profile );
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024); 

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen)
    };

    if(profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }


  return (
    <div className='relative flex bg-richblack-900'>
        <Sidebar sidebar={isSidebarOpen} closeSidebar={()=> setIsSidebarOpen(false)}/>       
        <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>

            <div className={`flex lg:hidden flex-col items-start justify-between cursor-pointer py-2 transition-all ${!isSidebarOpen ? 'duration-[900ms] opacity-100 gap-y-1':'opacity-0 duration-200'}`} 
                     onClick={() =>handleSidebarToggle(!isSidebarOpen)}>
                    <div className={`w-[1.6em] ml-8 h-[0.2em] bg-richblack-75 ${!isSidebarOpen ? 'rounded-full':'rounded-normal'}`}></div>
                    <div className={`w-[1.6em] ml-8 h-[0.2em] bg-richblack-75 ${!isSidebarOpen ? 'rounded-full':'hidden'}`}></div>
                    <div className={`w-[1.6em] ml-8 h-[0.2em] bg-richblack-75 ${!isSidebarOpen ? 'rounded-full':'rounded-normal'}`}></div>
            </div>
            <div className='pr-5'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard
