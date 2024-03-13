import React from 'react'
import RenderSteps from './RenderSteps';

const AddCourse = () => {

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


  return (
    <div className='flex items-baseline text-white mx-auto w-11/12 gap-x-6'>
         <div className='w-8/12'>
            <h1>Add Course</h1>
            <div>
                <RenderSteps/>
            </div>
         </div>
         <div className='rounded-md border-richblack-700 bg-richblack-800 text-richblack-5 p-6 inline-flex flex-col w-3/12'>
            <p className='text-lg'>code upload tips</p>
            <ul className='text-md'>
                {
                    courseTips.map((tip, index)=> (
                        <li key={index}>{tip}</li>
                    ))
                }
            </ul>
         </div>
    </div>
  )
}

export default AddCourse