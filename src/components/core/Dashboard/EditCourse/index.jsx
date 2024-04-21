import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from "../AddCourse/RenderSteps";
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const { course } = useSelector(state=> state.course);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector(state => state.auth);

    const courseTips = [
        "Set the Course Price option or make it free.",
        "Standard size for the course thumbnail is 1024x576.",
        "Video section controls the course overview video.",
        "Course Builder is where you create & organize a course.",
        "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
        "Information from the Additional Data section shows up on the course single page.",
        "Make Announcements to notify any important",
        "Notes to all enrolled students at once."
    ];

    useEffect(()=>{
        const populateCourse = async () => {
            setLoading(true);
            let result = await getFullDetailsOfCourse(courseId, token);
            console.log("edit ka result....",result);

            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }

        populateCourse();
    },[])

    if(loading){
        return (
                <div>Loading ...</div>
            )
    }

  return (
    <div className='flex gap-x-7 items-baseline text-white ml-10 w-[90%]'>
        <div className='w-[86%]'>
           <h1>Edit Course</h1>
           <div>
              {course ? (<RenderSteps />): (<p>Course Not Found</p>)}
           </div>
        </div>
        <div className='rounded-md border-richblack-700 bg-richblack-800 text-richblack-5 py-6 flex flex-col justify-center items-baseline mt-6'>
           <p className='text-lg mb-4 ml-4'>⚡Course Upload Tips</p>
           <ul className='text-md p-6'>
               {
                   courseTips.map((tip, index)=> (
                       <li key={index} className='text-xs list-disc mb-4'>{tip}</li>
                   ))
               }
           </ul>
        </div>
   </div>
  )
}

export default EditCourse