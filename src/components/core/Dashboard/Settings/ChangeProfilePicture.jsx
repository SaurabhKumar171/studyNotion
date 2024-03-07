import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../common/IconBtn'
import { useLocation } from 'react-router-dom'
import { MdOutlineFileUpload  } from "react-icons/md"
import { updateDisplayPicture} from "../../../../services/operations/settingsAPI"

const ChangeProfilePicture = () => {

    const [loading, setLoading] = useState(false)
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) =>  state.auth)
    const dispatch = useDispatch();

    const inputRef = useRef();

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null)

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0]
        // console.log(file)
        if (file) {
          setSelectedFile(file)
          previewFile(file)
        }
      };

    const onChooseFile = () => {
      inputRef.current.click();
    };

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setPreviewSource(reader.result)
        }
    }

    const onHandleFileUpload = () => {
        try {
          setLoading(true)
          const formData = new FormData()
          formData.append("displayPicture", selectedFile)
          dispatch(updateDisplayPicture(token, formData)).then(() => {
            setLoading(false)
          })
        } catch(error){
          console.log("ERROR MESSAGE - ", error.message)
        }
    }

  return (
        <div className='bg-richblack-800 flex max-[447px]:flex-col items-center gap-6 p-4 rounded-lg'>
            <img 
            src={ previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className='aspect-square w-[78px] rounded-full object-cover' 
            />
            <div>
                <p className="text-richblack-5 text-center text-md font-medium capitalize mb-2"> Change profile picture </p>

                <div className="flex gap-2 items-center max-[300px]:flex-col">
                    {/* Hidden file input element */}
                    <input
                    type="file"
                    ref={inputRef}
                    onChange={handleProfileImageChange}
                    className="hidden"
                    accept="image/png, image/gif, image/jpeg"
                    />                              

                    <button onClick={onChooseFile} className='bg-richblack-700 py-1 px-3 rounded-md max-[301px]:w-full'>
                    Select
                    </button>

                    <IconBtn 
                        text={loading?"Uploading...":"Upload"}
                        onclick={onHandleFileUpload}
                        customClasses={"max-[301px]:w-full"}
                    > 
                        <MdOutlineFileUpload />  
                    </IconBtn>  
                </div>

            </div>
        </div>
  )
}

export default ChangeProfilePicture