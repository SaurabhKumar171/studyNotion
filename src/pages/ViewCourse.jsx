import React, {useEffect, useState} from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';

const ViewCourse = () => {

    const [reviewModal, setReviewModal]= useState(false);
    const {courseId} = useParams();
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();


    useEffect(()=>{
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCompletedLectures(courseData.completedVideos));

            let lectures = 0;

            courseData?.courseDetails?.courseContent?.forEach((sec)=>{
                lectures += sec.subSection.length
            })

            dispatch(setTotalNoOfLectures(lectures));
        }

        setCourseSpecificDetails();
    },[])

  return (
    <>

        <div>
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            <div>
                <Outlet />
            </div>
        </div>

        {
            reviewModal &&
            (<CourseReviewModal setReviewModal= {setReviewModal}/>)
        }
        
    </>
  )
}

export default ViewCourse