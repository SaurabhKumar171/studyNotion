import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';
import copy from 'copy-to-clipboard';
import { addCourseToCart } from '../../../services/operations/courseDetailsAPI';

const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {

    const {
        thumbnail : ThumbnailImage,
        price : CurrentPrice
    } = course;

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You cannot buy your own courses");
            return;
        }

        if(token){
            dispatch(addToCart(course));
            addCourseToCart(course._id, token);
            return;
        }
        
        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1text:"login",
            btn2Text:"cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler: ()=> setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    }

  return (
    <div>
        <img 
            src={ThumbnailImage} 
            alt="Thumbanil" 
            className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl'
        />

        <div>
            Rs. {CurrentPrice}
        </div>

        <div>
            <button
                className='bg-yellow-50 w-fit text-richblack-900'
                onClick={
                            user && course.studentsEnrolled.includes(user?._id) ?
                            ()=> navigate("/dashboard/enrolled-courses")
                            : handleBuyCourse
                        }
            >
                { 
                    user && course.studentsEnrolled.includes(user?._id) ?
                    "Go to Dashboard":
                    "Buy Course"
                }
            </button>

            {
                !course.studentsEnrolled.includes(user?._id) && (
                    <button onClick={handleAddToCart}  
                    className='bg-yellow-50 w-fit text-richblack-900'>
                        Add to Cart
                    </button>
                )
            }
        </div>

        <div>
            <p>
                30-Day Money-Back Guarantee
            </p>
            <p>
                This Course Includes:
            </p>
            <div className='flex flex-col gap-y-3'>
                {
                    course?.instructions.map((item, index)=>(
                        <p key={index} className='flex gap-2'>
                            <span>{item}</span>
                        </p>
                    ))

                }
            </div>
        </div>
        <div>
            <button
              className='mx-auto flex items-center gap-2 p-6 text-yellow-50'
               onClick={handleShare}
                >
               Share
            </button>
        </div>
    </div>
  )
}

export default CourseDetailsCard