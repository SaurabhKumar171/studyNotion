import React from 'react'
import IconBtn from './IconBtn'
import Overlay from './Overlay'

const ConfirmationModal = ({modalData}) => {
  return (
        <div className='rounded-md border-[1px] border-black bg-richblack-800 p-3 w-5/12 mx-auto absolute top-[10rem] left-[25rem] z-50 transition-all duration-300'>
            <div className='flex flex-col items-center gap-y-2'>
                <p className='text-2xl font-medium font-inter text-richblack-5'>
                    {modalData.text1}
                </p>
                <p className='text-md font-inter text-richblack-5'>
                    {modalData.text2}
                </p>
                <div className='flex gap-x-4'>
                    <IconBtn 
                        onclick={modalData?.btn1Handler}
                        text={modalData?.btn1Text}
                        />
                    <button onClick={modalData?.btn2Handler}>
                        {modalData?.btn2Text}
                    </button>    
                </div>
            </div>
        
        </div>

  )
}

export default ConfirmationModal
