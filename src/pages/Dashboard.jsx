import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from "react-router-dom"
import Sidebar from '../components/core/Dashboard/Sidebar'
import { slide as Menu } from 'react-burger-menu';

const Dashboard = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth );
    const {loading: profileLoading} = useSelector( (state) => state.profile );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024); 

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSidebarToggle = (status) => {
        setIsSidebarOpen(status)
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
            {isSmallScreen ? 
                <Menu 
                    isOpen={isSidebarOpen} 
                    width={'250px'} 
                    onClose={() => setIsSidebarOpen(false)} 
                    >
                        
                    <Sidebar handleSidebarToggle={handleSidebarToggle}/>
                </Menu> :

                <Sidebar />
            }         
            <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>
                <div className='pr-5'>
                    <button onClick={() =>handleSidebarToggle(!isSidebarOpen)}  className='text-white'>
                        Toggle Sidebar
                    </button>
                    <Outlet />
                </div>
            </div>
    </div>
  )
}

export default Dashboard
