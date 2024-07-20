import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesApi"
import { resetCartCourses } from '../../../../services/operations/courseDetailsAPI'

const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state)=> state.cart);
    const { token } = useSelector((state)=> state.auth);
    const { user } = useSelector((state)=> state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0);

    const handleBuyCourses = () => {
        const courses = cart.map((course)=> course._id);
        buyCourse(token, courses, user, navigate, dispatch);
        resetCartCourses(token);
        
    }

    useEffect(()=>{
      let amntSum = 0;
      cart.forEach((course) => {
        amntSum += course.price;
      });
      setTotalAmount(amntSum);
    },[cart])

  return (
    <div className='bg-richblack-700 p-4 rounded-md w-[200px] xs:w-[250px] md:w-[300px] ml-4'>
        <p className='text-richblack-200'>Total:</p>
        {/* <p className='font-inter font-semibold text-2xl text-yellow-50'>Rs. {total}</p> */}
        <p className='font-inter font-semibold text-2xl text-yellow-50'>{`Rs. ${totalAmount}`}</p>

        {
          totalAmount > 0 && 
          <p className='text-richblack-200 line-through'>{`Rs. ${totalAmount + 500}`}</p>
        }

        <IconBtn
            text="Buy Now"
            onclick={handleBuyCourses}
            customClasses={"flex flex-row-reverse w-full justify-center w-full py-2 font-medium mt-2 bg-yellow-50"}
        />
    </div>
  )
}

export default RenderTotalAmount