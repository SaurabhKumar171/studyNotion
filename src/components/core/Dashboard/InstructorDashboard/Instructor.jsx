import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorData } from '../../../../services/operations/profileApi';

const Instructor = () => {

    const { token } = useSelector(state => state.auth);
    const [loading , setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        const getCourseDataWithStats = async () => {
            setLoading(true);

            const instructorApiData = await getInstructorData(token);
            // const result = await fetchInstructorCourses(token);

            console.log("instructorApiData ",instructorApiData);

            if(instructorApiData.length)
                setInstructorData(instructorApiData)

            // if(result){
            //     setCourses(result)
            // }
            setLoading(false);
        }
    },[])

  return (
    <div>Instructor</div>
  )
}

export default Instructor