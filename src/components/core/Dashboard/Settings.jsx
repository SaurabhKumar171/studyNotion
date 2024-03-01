import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { useLocation } from 'react-router-dom'
import { MdEditDocument } from "react-icons/md";
import { MdOutlineFileUpload  } from "react-icons/md"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Settings = () => {

    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const location = useLocation();

    const inputRef = useRef();
    const [formData, setFormData] = useState({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      dateOfBirth: user.additionalDetails.dateOfBirth || new Date(),
      gender: user.additionalDetails.gender || '',
      contactNumber: user.additionalDetails.contactNumber || '',
      about: user.additionalDetails.about || '',
    })

    const [passwordData, setPasswordData] = useState({
      currentPassword : "",
      newPassword : ""
    })
    const [selectedFile, setSelectedFile] = useState(null);
    const [currPassword, setCurrPassword] = useState(false)
    const [updatePassword, setUpdatedPassword] = useState(false)
  
    const handleProfileImageChange = (event) => {
      if (event.target.files && event.target.files.length > 0) {
        setSelectedFile(event.target.files[0]);
      }

      console.log("selectedFile",event.target.files[0]);
    };
  
    const onChooseFile = () => {
      inputRef.current.click();
    };

    const handleOnChange = (e) => {
      setFormData({
                    ...formData, 
                    [e.target.name]: e.target.value
                  });

      console.log("FormData",formData);
    }

    const handlePasswordChange = (e) => {
      setPasswordData({
                        ...passwordData,
                        [e.target.name]: e.target.value
                      })
    }

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

    const handleResetForm = (e) => {
      console.log(e.target);
    }

    useEffect(()=>{
      console.log("FormData",formData);
    },[formData])

  return (
      <div className='text-white pl-7 pt-4 flex flex-col gap-4 mb-6'>

          <div className='rounded-lg'>
              <div>
                  <span className="text-richblack-300 capitalize text-sm">{`Home   /   Dashboard   /   `}</span>
                  <span className='text-yellow-50'>{convertUrlToBreadcrumb(location.pathname)}</span>
              </div>
              <h1 className='text-richblack-5 font-inter text-2xl mt-3 capitalize'>
                  edit profile
              </h1>
          </div>

          <div className=' flex flex-col gap-8 w-[80%] mt-5 mx-auto'>
              {/* section 1 */}
              <div className='bg-richblack-800 flex items-center gap-6 p-4 rounded-lg'>
                      <img 
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className='aspect-square w-[78px] rounded-full object-cover' 
                      />
                      <div>
                          <p className="text-richblack-5 text-md font-medium capitalize mb-2"> Change profile picture </p>

                          <div className="flex gap-2 items-center ">
                              {/* Hidden file input element */}
                              <input
                                type="file"
                                ref={inputRef}
                                onChange={handleProfileImageChange}
                                style={{ display: "none" }}
                              />                              

                              <button onClick={onChooseFile} className='bg-richblack-700 py-1 px-3 rounded-md'>
                                Select
                              </button>

                              <IconBtn 
                                  text={"Upload File"}
                              > 
                                  <MdOutlineFileUpload />  
                              </IconBtn>  
                          </div>

                      </div>
              </div>

              {/* section 2 */}
              <section className='flex flex-col'>
                <div className='bg-richblack-800 flex flex-col p-6 rounded-lg'>
                    <p className="text-richblack-5 capitalize mb-6 text-xl font-semibold">profile information</p>

                    <div className='flex flex-col gap-4 justify-between items-center'>

                      <div className="flex justify-between items-center w-full flex-wrap">
                        <label className="w-[48%]">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            First Name
                          </p>
                          <input
                            required
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleOnChange}
                            placeholder="Enter first name"
                            style={{
                              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                          />
                        </label>

                        <label className="w-[48%]">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Last Name
                          </p>
                          <input
                            required
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleOnChange}
                            placeholder="Enter last name"
                            style={{
                              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                          />
                        </label>
                      </div>

                      <div className="flex justify-between items-center w-full flex-wrap">
                        <label className="w-[48%]">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Date of Birth
                          </p>
                          <DatePicker
                            showIcon
                            selected={formData.dateOfBirth}
                            onChange={(date) => setFormData((prevFormData) => ({
                                          ...prevFormData,
                                          dateOfBirth: date,
                                        }))
                                      }
                            dateFormat="MM/dd/yyyy"
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 custom-datepicker"
                          />
                        </label>

                        <label className="w-[48%]">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Gender
                          </p>
                          <select
                            value={formData.gender}
                            onChange={handleOnChange}
                            style={{
                              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </label>
                      </div>

                      <div className="flex justify-between items-center w-full flex-wrap">
                        <label className="w-[48%]">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Contact Number
                          </p>
                          <input
                            required
                            type="number"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleOnChange}
                            placeholder="Enter Contact Number"
                            style={{
                              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                          />
                        </label>

                        <label className="w-[48%]">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            About
                          </p>
                          <input
                            required
                            type="text"
                            name="about"
                            value={formData.about}
                            onChange={handleOnChange}
                            placeholder="Enter Bio Details"
                            style={{
                              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                          />
                        </label>
                      </div>

                    </div>
                </div>
                <div className='flex gap-x-4 justify-end mt-7'>
                  <button className="bg-richblack-700 px-3 rounded-md text-normal hover:scale-95 transition-all duration-200" onClick={handleResetForm}>Cancel</button>
                  <IconBtn text={"Save"} customClasses={"py-1 font-semibold"}/>
                </div>
              </section>

              {/* section 3 */}
              <section className='flex flex-col'>
                <div className='bg-richblack-800 flex flex-col p-6 rounded-lg'>
                    <p className="text-richblack-5 capitalize mb-6 text-xl font-semibold">Password</p>

                    <div className='flex flex-col gap-4 justify-between items-center'>

                      <div className="flex justify-between items-center w-full flex-wrap">
                        <label className="w-[48%] relative">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Current Password
                          </p>
                          <input
                            required
                            type={`${!currPassword?"text":"password"}`}
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter first name"
                            style={{
                              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                          />
                          <span
                            onClick={() => setCurrPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                            {currPassword ? (
                              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                          </span>
                        </label>

                        <label className="w-[48%] relative">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            New Password
                          </p>
                          <input
                            required
                            type={`${!updatePassword?"text":"password"}`}
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter last name"
                            style={{
                              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                          />
                          <span
                            onClick={() => setUpdatedPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                            {updatePassword ? (
                              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                          </span>
                        </label>
                      </div>

                    </div>
                </div>
                
                <div className='flex gap-x-4 justify-end mt-7'>
                  <button className="bg-richblack-700 px-3 rounded-md text-normal hover:scale-95 transition-all duration-200" onClick={handleResetForm}>Cancel</button>
                  <IconBtn text={"Save"} customClasses={"py-1 font-semibold"}/>
                </div>
              </section>
          </div>
        
      </div>
      )
}

export default Settings