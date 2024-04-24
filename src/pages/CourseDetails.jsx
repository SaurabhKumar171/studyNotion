import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesApi';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Error from "./Error";
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from "../components/common/RatingStars";

const CourseDetails = () => {

    const {user, loading} = useSelector((state)=> state.profile)
    const {token} = useSelector((state)=> state.auth)
    const {paymentLoading} = useSelector((state)=> state.course)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams(); 

    const [courseData, setCourseData] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLecture] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(null); 

    useEffect(()=>{
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                setCourseData(result);
                console.log("setCourseData result..",courseData)
                
            } catch (error) {
                console.log("Could not fetch course details" + error);
            }
        }
        getCourseFullDetails();

    },[courseId])

    useEffect(()=>{
        const count = GetAvgRating(courseData?.data?.data?.ratingAndReviews);
        setAvgReviewCount(count);
    },[courseData])

    useEffect(()=>{
        let lectures = 0;
        courseData?.data?.data?.courseContent?.forEach((sec)=>{
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLecture(lectures);
    },[courseData])

    const handleBuyCourse = () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
            return ;
        }
        setConfirmationModal({
            text1: `You are not logged in`,
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    if(loading || !courseData){
        return (
                    <div>
                        Loading ...
                    </div>
                );
    }

    if(!courseData.success){
        return (
            <Error/>
        )
    }

    const {
        // _id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data?.data;

  return (
    <div>

        <p>{ courseName }</p>
        <p></p>
        <div className='flex gap-x-2'>
            <span>{ avgReviewCount }</span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
            <span>`(${ratingAndReviews?.length} reviews)`</span>
            <span>`(${studentsEnrolled.length} students enrolled)`</span>
        </div>
        
        { confirmationModal  && <ConfirmationModal modalData={confirmationModal} /> }
        <button 
            className="bg-yellow-50 p-6 mt-10"
            onClick={()=>handleBuyCourse()}
        >
            Buy now
        </button>
    </div>
  )
}

export default CourseDetails