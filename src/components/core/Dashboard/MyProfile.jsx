import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { useLocation } from 'react-router-dom'
import { MdEditDocument } from "react-icons/md";

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const location = useLocation();

    function convertUrlToBreadcrumb(url) {
        const parts = url.split('/');
        const filteredParts = parts.filter(part => part.trim() !== '');
    
        const breadcrumbs = filteredParts.map((part, index) => {
            const capitalizedPart = part.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            if (index === filteredParts.length - 1) {
                return capitalizedPart;
            }
            return capitalizedPart + ' / ';
        });
    
        const cleanedBreadcrumb = breadcrumbs.join('').replace('Dashboard / ', '');
    
        return cleanedBreadcrumb;
    }
    
    
  return (
    <div className='text-white pl-7 pt-4 flex flex-col gap-4'>

        <div className='rounded-lg'>
            <div>
                <span className="text-richblack-300 capitalize text-sm">{`Home   /   Dashboard   /   `}</span>
                <span className='text-yellow-50'>{convertUrlToBreadcrumb(location.pathname)}</span>
            </div>
            <h1 className='text-richblack-5 font-inter text-2xl mt-3 '>
                {convertUrlToBreadcrumb(location.pathname)}
            </h1>
        </div>

        <div className=' flex flex-col gap-4 w-[80%] mt-5 mx-auto'>
            {/* section 1 */}
            <div className='bg-richblack-800 flex justify-between items-center p-4 rounded-lg'>
                <div className='flex gap-4 justify-center items-center'>
                    <img 
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[78px] rounded-full object-cover' />
                    <div>
                        <p className="text-richblack-5 text-xl font-medium"> {user?.firstName + " " + user?.lastName} </p>
                        <p className="text-richblack-300 text-sm"> {user?.email}</p>
                    </div>
                </div>
                <IconBtn
                    text="Edit"
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}>
                        <MdEditDocument />
                </IconBtn>
            </div>

            {/* section 2 */}
            <div className='bg-richblack-800 flex flex-col p-4 rounded-lg'>
                <div className='flex justify-between items-center'>
                    <p className="text-richblack-300">About</p>
                    <IconBtn
                    text="Edit"
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}>
                        <MdEditDocument />
                    </IconBtn>
                </div>
                <p className="text-richblack-5"> 
                    {user?.additionalDetails?.about  ??  "Write Something about Yourself"}
                </p>
            </div>

            {/* section 3 */}
            <div className='bg-richblack-800 flex flex-col justify-around p-4 rounded-lg'>
                <div className='flex justify-between items-center'>
                    <p className='text-richblack-5 text-lg font-medium'>Personal Details</p>
                    <IconBtn
                    text="Edit"
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}>
                    <MdEditDocument />    
                    </IconBtn>
                </div>
                <div className='flex flex-wrap w-full mt-4 gap-6'>
                    <div className="flex flex-col w-[45%]">
                        <p className="text-richblack-300 text-sm">First Name</p>
                        <p className="text-richblack-5 text-sm">{user?.firstName}</p>
                    </div>
                    <div className="flex flex-col w-[45%]">
                        <p className="text-richblack-300 text-sm">Email</p>
                        <p className="text-richblack-5 text-sm">{user?.email}</p>
                    </div>
                    <div className="flex flex-col w-[45%]">
                        <p className="text-richblack-300 text-sm">Gender</p>
                        <p className="text-richblack-5 text-sm">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                    </div>
                    <div className="flex flex-col w-[45%]">
                        <p className="text-richblack-300 text-sm">Last Name</p>
                        <p className="text-richblack-5 text-sm">{user?.lastName}</p>
                    </div>
                    <div className="flex flex-col w-[45%]">
                        <p className="text-richblack-300 text-sm">Phone Number</p>
                        <p className="text-richblack-5 text-sm">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                    </div>
                    <div className="flex flex-col w-[45%]">
                        <p className="text-richblack-300 text-sm">Date of Birth</p>
                        <p className="text-richblack-5 text-sm">{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default MyProfile
