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
    <div className='flex md:flex-row flex-col-reverse gap-x-7 items-baseline text-white ml-10 w-full md:w-[90%]'>
         <div className='w-[86%] md:mt-0 mt-8'>
            <h1>Add Course</h1>
            <div>
                <RenderSteps/>
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

export default AddCourse