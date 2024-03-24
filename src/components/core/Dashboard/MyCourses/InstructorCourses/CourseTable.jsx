import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { deleteCourse, fetchInstructorCourses } from '../../../../../services/operations/courseDetailsAPI';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

const CourseTable = ({courses, setCourses}) => {

  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  
  const handleCourseDelete = async(courseId) => {
      setLoading(true);

      await deleteCourse({courseId: courseId}, token);
      const result = await fetchInstructorCourses();

      if(result){
        setCourses(result);
      }
      setConfirmationModal(null);
      setLoading(false);

  }

  return (
    <div className='text-white'>
        <Table className="border-[0.1px] border-richblack-300">
          <Thead>
            <Tr className="flex gap-x-10 border-richblack-800 p-8 uppercase">
              <Th>Courses</Th>
              <Th>Duration</Th>
              <Th>Prices</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {
              courses.length === 0 ?
              (
                <Tr>
                  <Td>No courses found</Td>
                </Tr>
              ):
              (
                courses.map((course, index)=> (
                  <Tr 
                    key={index} 
                    className="flex gap-x-10 border-richblack-800 p-8">

                    <Td className="flex gap-x-4">
                      <img 
                          src={course?.thumbnail} 
                          alt="course-thumbnail" 
                          className='h-[150px] w-[220px] object-cover rounded-lg'
                      />
                      <div className='flex flex-col'>
                          <p>{course.courseName}</p>
                          <p>{course.courseDescription}</p>
                          <p>Created:</p>
                          {
                            course.status === COURSE_STATUS.PUBLISHED ?
                            (
                              <button className='border-2 border-yellow-50 text-yellow-50'>
                                Published
                              </button>
                            ):
                            (<button className="text-pink-50">Drafted</button>)
                          }
                      </div>  
                    </Td>

                    <Td>2hrs 30 Min.</Td>
                    <Td>{course.price}</Td>
                    <Td className="flex gap-x-2">
                      <button
                        disabled={loading}
                        onClick={()=>{
                          navigate(`/dashboard/edit-course/${course._id}`)
                        }}
                      >
                         Edit
                      </button>

                      <button
                        disabled={loading}
                        onClick={() => setConfirmationModal({
                            text1: "Do you want to delete this course?",
                            text2: "All the data related to this course will be deleted.",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: !loading ? () => {handleCourseDelete(course._id)} : ()=> {},
                            btn2Handler: () => setConfirmationModal(null),
                        })}
                      >
                          Delete
                      </button>
                    </Td>
                </Tr>
                ))
              )
            }
          </Tbody>
        </Table>

        {
          confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
    </div>
  )
}

export default CourseTable