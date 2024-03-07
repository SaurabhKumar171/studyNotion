import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from "react-router-dom"
import Sidebar from '../components/core/Dashboard/Sidebar'
import Overlay from '../components/common/Overlay'
import HamburgerSidebar from '../components/common/HamburgerSidebar'

const Dashboard = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth );
    const {loading: profileLoading} = useSelector( (state) => state.profile );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024); 
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1024);
            // setIsSidebarOpen(window.innerWidth <= 1024);
            // console.log("isSidebarOpen ",window.innerWidth," --- > ",isSidebarOpen);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isSidebarOpen && isSmallScreen) {
            const timer = setTimeout(() => {
                setShowOverlay(true);
            }, 700);

            return () => clearTimeout(timer);
        } else {
            setShowOverlay(false);
        }
    }, [isSidebarOpen, isSmallScreen]);

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
 
        <Sidebar sidebar={isSidebarOpen} isSmallScreen={isSmallScreen} closeSidebar={()=> setIsSidebarOpen(false)}/>    

        <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full mb-4'>
            <HamburgerSidebar 
                            isSmallScreen={isSmallScreen} 
                            isSidebarOpen={isSidebarOpen} 
                            handleSidebarToggle={handleSidebarToggle}
                />
                
            <div className='pr-5'>
                <Outlet />
            </div>
        </div>

        {showOverlay && <Overlay />}

    </div>
  )
}

export default Dashboard
