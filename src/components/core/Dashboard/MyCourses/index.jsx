import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { FiPlus } from "react-icons/fi";
import CourseTable from './InstructorCourses/CourseTable';
import IconBtn from '../../../common/IconBtn';

const MyCourses = () => {

  const { token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

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
    <div className='text-white flex flex-col'>
       <div className="flex justify-between">
          <h1>My Courses</h1>
          <IconBtn 
                text="Add Course" 
                onclick={()=>navigate("/dashboard/add-course")}
                customClasses={"bg-yellow-50 flex items-center"}
          >
              <FiPlus />
          </IconBtn>
       </div>

       { courses && <CourseTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default MyCourses