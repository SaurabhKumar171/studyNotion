import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesApi';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Error from "./Error";
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from "../components/common/RatingStars";
import { formatDate } from '../services/operations/formatDate';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';

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
            } catch (error) {
                console.log("Could not fetch course details" + error);
            }
        }
        getCourseFullDetails();

    },[courseId])

    useEffect(()=>{
        const count = GetAvgRating(courseData?.data[0]?.ratingAndReviews);
        setAvgReviewCount(count);
    },[courseData])

    useEffect(()=>{
        let lectures = 0;
        courseData?.data?.data?.courseContent?.forEach((sec)=>{
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLecture(lectures);
    },[courseData])

    const [isActive , setIsActive] = useState(Array(0));

    const handleActive = (id)=>{
        setIsActive(
            !isActive.includes(id)?
            isActive.concat(id) :
            isActive.filter((i)=> i !== id)
          )
    }

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

    console.log("courseData...",courseData);

    const {
        _id,
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
    } = courseData?.data[0];

  return (
    <div className='flex flex-col  text-white'>

        <div className='relative flex flex-col justify-start p-8'>
            <p>{courseName}</p>
            <p>{courseDescription}</p>
            <div className='flex gap-x-2'>
                <span>{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews) `}</span>
                <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
            </div>

            <div>
                <p>Created By {`${instructor.firstName}`}</p>
            </div>

            <div className='flex gap-x-3'>
                <p>
                    Created At {formatDate(createdAt)}
                </p>
                <p>
                    {" "} English
                </p>
            </div>

            <div>
                <CourseDetailsCard 
                    course = {courseData?.data[0]}
                    setConfirmationModal = {setConfirmationModal}
                    handleBuyCourse = {handleBuyCourse}
                />
            </div>
        </div>

        <div>
            <p> What You WIll learn</p>
            <div>
                {whatYouWillLearn}
            </div>
        </div>

        <div>
            <div>
                <p>Course Content:</p>
            </div>

            <div className='flex gap-x-3 justify-between'>

                   <div>
                    <span>{courseContent.length} section(s)</span>

                        <span>
                            {totalNoOfLectures} lectures
                        </span>
                        <span>
                            {courseData.data?.totalDuration} total length
                        </span>
                   </div>

                   <div>
                        <button
                            onClick={() => setIsActive([])}>
                            Collapse all Sections
                        </button>
                   </div>

            </div>
        </div>

        {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>
        
        { confirmationModal  && <ConfirmationModal modalData={confirmationModal} /> }
    </div>
  )
}

export default CourseDetails