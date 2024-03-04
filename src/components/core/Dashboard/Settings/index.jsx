import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ConfirmationModal from '../../../common/ConfirmationModal'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';
import Overlay from '../../../common/Overlay';

const Settings = () => {

    const {user} = useSelector((state) => state.profile)
    const location = useLocation();


    const [confirmationModal, setConfirmationModal] = useState(null);

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
               <ChangeProfilePicture/>

              {/* section 2 */}
               <EditProfile/>

              {/* section 3 */}
               <UpdatePassword/>

              {/* section 4 */}
               <DeleteAccount setConfirmationModal={setConfirmationModal}/>
          </div>

           { //Confirmation modal
                confirmationModal && 
                <>
                    <Overlay/>                    
                    <ConfirmationModal modalData={confirmationModal} closeModal={()=>setConfirmationModal(null)}/>
                </>
            }
      </div>
      )
}

export default Settings