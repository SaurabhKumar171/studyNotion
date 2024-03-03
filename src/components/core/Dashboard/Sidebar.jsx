import React, { useState, useEffect } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import {logout} from "../../../services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import {VscSignOut} from "react-icons/vsc"
import ConfirmationModal from '../../common/ConfirmationModal'
import '../../../Styles/Dashboard/SideBar.css'

const Sidebar = ({sidebar, closeSidebar}) => {

    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024); 

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const close = () => {
        closeSidebar();
    }

    if(profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }

  return (
    <div className={`text-white max-[1024px]:h-full max-[1024px]:absolute transition-all duration-[850ms] max-[1024px]:z-[1] ${sidebar ? 'max-[1024px]:left-0' : 'max-[1024px]:left-[-100%]' }`}>
        
        <div className='flex flex-col min-w-[222px] border-r-[1px] border-r-richblack-700
            bg-richblack-800 h-full py-10 relative'>

            <div className={`flex lg:hidden flex-col items-start justify-between cursor-pointer transition-all absolute top-4 right-3 ${sidebar ? 'duration-[900ms] opacity-100':'opacity-0 duration-200'}`} 
                     onClick={close}>
                    <div className={`w-[1.6em] h-[0.2em] bg-richblack-75 ${sidebar && 'rotate-45'}`}></div>
                    <div className={`w-[1.6em] h-[0.2em] bg-richblack-75 ${sidebar && 'close-sidebar'}`}></div>
            </div>
                
            <div className='flex flex-col'>
                            {sidebarLinks.map((link) => {
                                if (link.type && user?.accountType !== link.type) return null;
                                return (
                                    <SidebarLink key={link.id} link={link} iconName={link.icon} />
                                )
                            })}
            </div>
            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
            <div className='flex flex-col'>
                <SidebarLink
                    link={{ name: "Settings", path: "dashboard/settings" }}
                    iconName="VscSettingsGear"
                />
                <button
                    onClick={() => setConfirmationModal({
                        text1: "Are You Sure ?",
                        text2: "You will be logged out of your Account",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                    })}
                    className='text-sm font-medium text-richblack-300 px-8 py-2'
                >
                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg' />
                        <span>Logout</span>
                    </div>
                </button>
            </div>
        </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default Sidebar
