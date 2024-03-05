import React , {useRef} from 'react'
import IconBtn from './IconBtn'
import useOnClickOutside from '../../hooks/useOnClickOutside'

const ConfirmationModal = ({modalData, closeModal}) => {

    const ref = useRef(null)
    useOnClickOutside(ref, closeModal)

  return (
        <div className='rounded-md bg-richblack-800 p-3 w-[25rem] mx-auto absolute top-[10rem] left-[37rem] z-50 transition-all duration-300' ref={ref}>
            <div className='flex flex-col items-center gap-y-2'>
                <p className='text-2xl font-medium font-inter text-richblack-5'>
                    {modalData.text1}
                </p>
                <p className='text-md font-inter text-richblack-5'>
                    {modalData.text2}
                </p>
                <div className='flex gap-x-4 mt-4'>
                    <IconBtn 
                        onclick={modalData?.btn1Handler}
                        text={modalData?.btn1Text}
                        />
                    <button onClick={modalData?.btn2Handler} className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-medium text-richblack-50'>
                        {modalData?.btn2Text}
                    </button>    
                </div>
            </div>
        
        </div>

  )
}

export default ConfirmationModal
