import React from 'react'
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {

    // const {cart} = useSelector((state)=> state.cart)
    const cart = [
        {
          _id: 1,
          courseName: "The Complete Python Bootcamp From Zero to Hero in Python,The Complete Python Bootcamp From Zero to Hero in Python",
          thumbnail: "https://api.dicebear.com/5.x/initials/svg?seed=b%20b",
          category: { name: "Name" },
          ratingAndReviews: [{}, {}, {}],
          price: "19.99",
        },];

    const dispatch = useDispatch();

    console.log("cart",cart)
  return (
    <div className='flex flex-col gap-4 w-[75%]'>
        {
            cart.map((course , index)=> (
                <div key={index}
                     className='border-b border-b-richblack-700 pl-7 flex items-start gap-4 py-3'>
                    <img src={course?.thumbnail} alt={`${course.courseName}-${index}`} width={100} className='rounded-md'/>

                    <div className='flex'>
                        <div>
                            <p className='text-lg font-inter font-medium text-richblack-5'>{course?.courseName}</p>
                            <p className='text-md font-inter font-normal text-richblack-300'>{course?.category?.name}</p>
                            <div className="flex flex-wrap items-center gap-2">
                                <span>4.8</span>
                                <span className="flex">
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"   
                                        emptyIcon={<GiNinjaStar/>}  
                                        fullIcon={<GiNinjaStar/>}   
                                        className="flex"          
                                    />
                                </span>
                                <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>
                            </div>
                        </div>
                    </div>

                    <div className=''>
                        <button
                            className='bg-richblack-700 text-pink-200 text-md rounded-md flex gap-1 justify-center items-center p-2'
                            onClickCapture={()=> dispatch(removeFromCart(course._id))}>
                            <RiDeleteBin6Line />
                            <span>Remove</span>
                        </button>

                        <p className='font-inter font-semibold text-xl text-yellow-50 mt-5'>Rs. {course?.price}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses