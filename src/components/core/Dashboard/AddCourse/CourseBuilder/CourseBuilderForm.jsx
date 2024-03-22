import React, { useState } from 'react'
import {useForm} from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineNavigateNext } from "react-icons/md";
import { setStep, setEditCourse, setCourse } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

  const {register, handleSubmit, setValue, formState:{errors}} = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state)=> state.auth); 

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = () => {
      dispatch(setStep(1));
      dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    console.log("here");
      if(course?.courseContent?.length === 0){
          toast.error("Please add at least one section");
          return ;
      }

      if(course.courseContent.some((section)=> section?.subSection?.length === 0)){
          toast.error("Please add at least one lecture in sub section");
          return ;
      }

      //if everything is good
      dispatch(setStep(3));
  }

  const onSubmit = async (data) => {
      setLoading(true);
      let result ;

      if(editSectionName){
        //we are editing the section name
        result = await updateSection(
          {
            sectionName : data.sectionName,
            sectionId : editSectionName,
            courseId : course._id,
          },
          token)
      }
      else{
        result = await createSection(
          {
            sectionName : data.sectionName,
            courseId : course._id,
          },
          token)
      }

      //set updated course in course slice
      if(result){
        console.log("result....",result);
        dispatch(setCourse(result));
        setEditSectionName(null);
        setValue("sectionName", "");
      }
  }

  const handleChangeEditSectionName = (sectionName, sectionId) => {
    if(editSectionName === sectionId){
        cancelEdit();
        return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  }

  return (
    <div className="rounded-md border-richblack-700 bg-richblack-800 text-richblack-5 p-6">
      <p className='font-inter font-semibold text-lg mb-4'>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Section name<sup>*</sup></label>
          <input 
              id='sectionName'
              placeholder='Add a section to build your course'
              {...register('sectionName',{
                  required: true,
                  minLength: 5,
                })
              }
              className='w-full form-style'
          />
          {
            errors.sectionName && (
              <span>section name is required</span>
            )
          }
        </div>
        <div className='mt-10 flex items-center'>
          <IconBtn
              type="Submit"
              text={editSectionName ? "Edit section name":"Create section"}
              outline={true}
              customClasses={"text-white bg-richblack-800 border-2 border-yellow-50 text-yellow-50 flex flex-row"}
          >
              <FiPlusCircle className='text-yellow-50' size={15}/>
          </IconBtn>

          {
            editSectionName && 
            (<button
                type='button'
                onClick={cancelEdit}
                className='text-xs text-richblack-300 underline ml-10'
            >
              Cancel Edit
            </button>)
          }
        </div>
      </form>

      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      <div className='flex items-center gap-2 mt-6'>
        <button 
            onClick={goBack}
            className='rounded-md cursor-pointer flex items-center text-richblack-5'
        >
          <MdOutlineNavigateNext size={15} className='rotate-180'/>
          Back
        </button>

        <IconBtn text={"Next"} onclick={goToNext} customClasses={"bg-yellow-50 flex flex-row"}>
          <MdOutlineNavigateNext size={15}/>
        </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm