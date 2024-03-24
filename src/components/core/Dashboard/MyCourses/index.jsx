import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { FiPlus } from "react-icons/fi";
import CourseTable from './InstructorCourses/CourseTable';
import IconBtn from '../../../common/IconBtn';
import { convertUrlToBreadcrumb } from '../../../../utils/convertUrlToBreadcrumb';

const MyCourses = () => {

  const { token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const location = useLocation();

  useEffect(()=> {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);

      if(result){
        setCourses(result);
      }
    }
    fetchCourses();
  },[]);

  return (
    <div className='text-richblack-5 flex flex-col w-10/12 pl-7 pt-4'>

      <div>
          <div>
                  <span className="text-richblack-300 capitalize text-sm">{`Home   /   Dashboard   /   `}</span>
                  <span className='text-yellow-50'>{convertUrlToBreadcrumb(location.pathname)}</span>
          </div>
        <div className="flex justify-between mb-5">
            <h1 className='font-inter text-richblack-5 text-2xl mt-3'>My Courses</h1>
            <IconBtn 
                  text="Add Course" 
                  onclick={()=>navigate("/dashboard/add-course")}
                  customClasses={"bg-yellow-50 flex items-center p-2"}
            >
                <FiPlus />
            </IconBtn>
        </div>
      </div>

       { courses && <CourseTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default MyCourses