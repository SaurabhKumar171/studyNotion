import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const CoursePublishForm = () => {

    const {register, handleSubmit, setValue, getValues} = useForm();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(course.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true);
        }
    },[]);

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        // navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async () => {
        if((course.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
            (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)
          ){
            // no updation in form
            // no need to make api call
                goToCourses();
                return;
            }

        // if form is updated
        const formData = new FormData();
        formData.append("courseId",  course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status",courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);

        if(result){
            goToCourses();
        }
        setLoading(false);
    }

    const onSubmit = () => {
        handleCoursePublish();
    }

  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700'>
        <p>Publish Course</p>

        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <label htmlFor="public">
                    <input 
                        type="checkbox" 
                        name="public" 
                        id="public" 
                        {...register( "public",{ required: true})}
                        className="w-4 h-4 rounded"
                    />
                    <span className='ml-3'>
                        Make this Course as Public
                    </span>
                </label>
            </div>

            <div className='flex justify-end gap-x-3'>
                <button
                    disabled={loading}
                    type='button'
                    onClick={goBack}
                    className='flex items-center rounded-md bg-richblack-300 px-6 py-2'
                >
                    Back
                </button>

                <IconBtn 
                    disabled={loading}
                    text = "save changes"
                    customClasses={"bg-yellow-50"}
                />
            </div>
        </form>
        
    </div>
  )
}

export default CoursePublishForm