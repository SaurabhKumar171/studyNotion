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
    <div>
        <h1>Edit Course</h1>
        {
            course ? (<RenderSteps />): (<p>Course Not Found</p>)
        }
    </div>
  )
}

export default EditCourse