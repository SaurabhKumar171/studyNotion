import React from 'react'
import { useSelector } from 'react-redux';
import {FaCheck} from 'react-icons/fa'
import CourseInformationForm from './CourseInformation/CourseInformationForm';

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
        <div className='flex justify-between items-center mb-4'>
            { steps.map((item) => (
                    <>
                        <div>
                            <div className={`${item.id === step ? 
                                            "bg-yellow-900 border-yellow-50 text-yellow-50" : 
                                            "border-richblack-700 bg-richblack-800 text-richblack-300"}`
                                            }
                            >

                                {
                                    step > item.id ? (<FaCheck />) : (item.id)
                                }
                                
                            </div>  
                        </div>  
                        {/* add code for dashes b/w labels */}
                    </>
                ))}
        </div>
        <div className='flex justify-between items-center mb-4'>
            {
                steps.map((item, index) => (
                    <>
                        <div key={index}>
                            <p>{item.title}</p>
                        </div>
                    </>
                ))
            }
        </div>

        { step === 1 && <CourseInformationForm />}
        {/* { step === 2 && <CourseBuilderForm />}
        { step === 3 && <CoursePublishForm />} */}
    </>
  )
}

export default RenderSteps


       