import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileApi';
import ProgressBar from "@ramonak/react-progress-bar";
import { HiOutlineDotsVertical } from "react-icons/hi";

const EnrolledCourses = () => {

    const location = useLocation();
    const {token} = useSelector((state)=> state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const dispatch = useDispatch();

    function convertUrlToBreadcrumb(url) {
        const parts = url.split('/');
        const filteredParts = parts.filter(part => part.trim() !== '');

        const breadcrumbs = filteredParts.map((part, index) => {
            const capitalizedPart = part.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            if (index === filteredParts.length - 1) {
                return capitalizedPart;
            }
            return capitalizedPart + ' / ';
        });

        const cleanedBreadcrumb = breadcrumbs.join('').replace('Dashboard / ', '');

        return cleanedBreadcrumb;
    }

    const getEnrolledCourses = async () => {
      try {
        const response = await getUserEnrolledCourses(token, dispatch);
        console.log("resp enroll course...",response);
        setEnrolledCourses(response);
        console.log("enrolledCourses enroll course...",enrolledCourses);
      } catch (error) {
         console.log("Unable to fetch Enrolled courses");
      }
    }

    useEffect(() => {
      (async () => {
        await getEnrolledCourses();
      })();
    }, []);
       

  return (
    <div className='text-white pl-7 pt-4 flex flex-col gap-4'>
      <div className='rounded-lg'>
          <div>
              <span className="text-richblack-300 capitalize text-sm">{`Home   /   Dashboard   /   `}</span>
              <span className='text-yellow-50'>{convertUrlToBreadcrumb(location.pathname)}</span>
          </div>
          <h1 className='text-richblack-5 font-inter text-2xl mt-3 capitalize'>
              enrolled courses
          </h1>
      </div>

      {
        !enrolledCourses ? 
        (<div>Loading ...</div>) :
        !enrolledCourses?.length ? 
        (<p>You have not enrolled in any course yet</p>):
        (
          <div className='overflow-x-auto'>
            <div className="border border-richblack-700 rounded-md min-w-[600px]">
              <div className="grid grid-cols-4 gap-4 bg-richblack-700 p-4" 
                    style={{gridTemplateColumns: '40% 1fr 1fr 1fr'}}>
                    <p className=''>Course Name</p>
                    <p className=''>Duration</p>
                    <p className=''>Progress</p>
              </div>

              {/* course cards */}
              {
                enrolledCourses.map((course, index)=> (

                  <div key={index}
                      className="grid grid-cols-4 gap-4 border-b-richblack-700 p-4"
                      style={{gridTemplateColumns: '40% 1fr 1fr 1fr'}}>
                    <div className="flex items-center rounded-md gap-2">
                      <img src={course.thumbnail} alt={`course-${course.thumbnail}`} width={50} height={50} className="rounded"/>
                      <div>
                        <p>{course.courseName}</p>
                        <p>{course.courseDescription}</p>
                      </div>
                    </div>

                    <div className='my-auto'>
                        {course?.totalDuration}
                    </div>

                    <div className='my-auto'>
                        <p>Progress: {course.progressPercentage || 0}%</p>
                        <ProgressBar 
                              completed={course.progressPercentage || 0} 
                              height='8px'
                              isLabelVisible={false}
                        />
                    </div>
                    <div className='m-auto'>                   
                        <HiOutlineDotsVertical className='text-lg'/>
                      </div>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </div>
    )
}

export default EnrolledCourses