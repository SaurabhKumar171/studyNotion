import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from "../../../common/IconBtn"

const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state)=> state.cart);

    const handleBuyCourses = () => {
        const courses = cart.map((course)=> course._id);
        console.log("Bought these courses",courses);

        //TODO : API integrate -> payment gateway
    }

  return (
    <div className='bg-richblack-700 p-4 rounded-md w-[22%]'>
        <p className='text-richblack-200'>Total:</p>
        {/* <p className='font-inter font-semibold text-2xl text-yellow-50'>Rs. {total}</p> */}
        <p className='font-inter font-semibold text-2xl text-yellow-50'>Rs. 4500</p>

        <p className='text-richblack-200 line-through'>Rs. 3500</p>

        <IconBtn
            text="Buy Now"
            onclick={handleBuyCourses}
            customClasses={"w-full justify-center w-full py-2 font-medium mt-2"}
        />
    </div>
  )
}

export default RenderTotalAmount