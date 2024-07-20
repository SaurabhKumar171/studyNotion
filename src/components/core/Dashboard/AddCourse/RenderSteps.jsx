import React from 'react'
import { useSelector } from 'react-redux';
import {FaCheck} from 'react-icons/fa'
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import CoursePublishForm from './CoursePublishForm';

const RenderSteps = () => {

    const {step} = useSelector((state) => state.course);

    const steps = [
        {
            id : 1,
            title : "course information"
        },
        {
            id : 2,
            title : "course builder"
        },
        {
            id : 3,
            title : "publish"
        }
    ];

  return (
    <>
        <div className='flex justify-between items-center mb-4 mt-8 sm:w-7/12 sm:ml-28'>
            { steps.map((item, index) => (
                    <>
                        <div>
                            <div className={`${item.id === step ? 
                                            "bg-yellow-900 border border-yellow-50 text-yellow-50" : 
                                            "border-richblack-700 bg-richblack-800 text-richblack-300"}
                                            ${step > item.id ? "bg-yellow-50":""}
                                            rounded-full w-8 h-8 flex justify-center items-center`
                                            }
                            >
                                {
                                    step > item.id ? (<FaCheck className="text-richblack-800"/>) : (item.id)
                                }
                                
                            </div>  
                        </div>  
                        {/* Dashes b/w labels */}
                        { 
                            steps.length- 1 !== index && 
                            (<div className="h-[4px] border-b border-dashed border-yellow-25 w-full"></div>)
                        }
                    </>
                ))}
        </div>
        <div className='flex justify-between items-center mb-4 sm:w-[64%] sm:ml-20 mx-auto'>
            {
                steps.map((item, index) => (
                    <>
                        <div key={index}>
                            <p className='capitalize'>{item.title}</p>
                        </div>
                    </>
                ))
            }
        </div>

        { step === 1 && <CourseInformationForm />}
        { step === 2 && <CourseBuilderForm />}
        { step === 3 && <CoursePublishForm />}
    </>
  )
}

export default RenderSteps


       