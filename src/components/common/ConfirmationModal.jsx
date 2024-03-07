import React , {useRef} from 'react'
import IconBtn from './IconBtn'
import useOnClickOutside from '../../hooks/useOnClickOutside'

const ConfirmationModal = ({modalName, modalData, closeModal}) => {

    const ref = useRef(null)
    useOnClickOutside(ref, closeModal)

  return (
        <div 
            className={`rounded-md bg-richblack-800 p-3 w-[15rem] min-[450px]:w-[20rem] sm:w-[25rem] mx-auto absolute  right-[10%] min-[281px]:right-[16%] min-[370px]:right-[18%] min-[475px]:right-[6rem] min-[570px]:right-[8rem] md:right-[12rem] lg:right-[18rem] xl:right-[26rem] min-[1420px]:right-[40%] z-50 transition-all duration-300 top-[10rem]`} 
            ref={ref}
        >
            <div className='flex flex-col items-center gap-y-2'>
                <p className='text-2xl font-medium font-inter text-richblack-5'>
                    {modalData.text1}
                </p>
                <p className='text-md font-inter text-richblack-5 text-center'>
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
