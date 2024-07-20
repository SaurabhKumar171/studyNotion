import React, { useEffect, useRef, useState } from 'react'
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1, RxCross2 } from 'react-icons/rx';
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn';
import Overlay from '../../../../common/Overlay';
import useOnClickOutside from '../../../../../hooks/useOnClickOutside';

const SubSectionModal = ({
                            modalData ,
                            setModalData, 
                            add = false, 
                            view = false, 
                            edit = false
                        }) => {

        const {register, 
               handleSubmit, 
               setValue, 
               getValues, 
               formState:{errors}} = useForm();

        const dispatch = useDispatch();
        const {course} = useSelector((state) => state.course);
        const {token} = useSelector((state)=> state.auth); 
        const [loading , setLoading] = useState(false);
        const ref = useRef(null);

        useOnClickOutside(ref, () => setModalData(null))

        useEffect(()=>{
          if(view || edit){
            setValue("lectureTitle", modalData.title)
            setValue("lectureDescription", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
          }
        },[])

        const isFormUpdated = () => {
          const currentValues = getValues();
           if(currentValues.lectureTitle !==  modalData.title ||
              currentValues.lectureDescription !==  modalData.description ||
              currentValues.lectureVideo !==  modalData.videoUrl)
            {
              return true
            }
            return false;
        }

        const handleEditSubSection = async () => {
          const currentValues = getValues();
          const formData = new FormData();

          formData.append("sectionId", modalData.sectionId);
          formData.append("subSectionId", modalData._id);

          if(currentValues.lectureTitle !== modalData.title){
            formData.append("title", currentValues.lectureTitle);
          }
          if(currentValues.lectureDescription !== modalData.description){
            formData.append("description", currentValues.lectureDescription);
          }
          if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("video", currentValues.lectureVideo);
          }

          setLoading(true);
          // API call
          const result = await updateSubSection(formData, token);
          if(result){
            const updatedCourseContent = course.courseContent.map((section)=>
              section._id === result._id ? result : section
            );
            const updatedCourse = {...course, courseContent: updatedCourseContent};
            dispatch(setCourse(updatedCourse));
          }

          setModalData(null);
          setLoading(false);
        }

        const onSubmit = async (data)=> {

           if(view){
            return;
           }
           else if(edit){
             if(!isFormUpdated()){
                toast.error("No changes made to the form");
             }
             else{
                handleEditSubSection();
             }
             return;
           }

           const formData = new FormData();

           formData.append("sectionId", modalData);
           formData.append("title", data?.lectureTitle);
           formData.append("description", data?.lectureDescription);
           formData.append("video", data?.lectureVideo);
           setLoading(true);

           const result = await createSubSection(formData, token);

           if(result){
              const updatedCourseContent = course.courseContent.map((section)=>
                section._id === modalData ? result : section
              );
              
              const updatedCourse = {...course, courseContent: updatedCourseContent};
              dispatch(setCourse(updatedCourse))
            }

            setModalData(null);
            setLoading(false);
      }  

  return (
    // <>
    //   <Overlay></Overlay>
    //   <div className='absolute top-[-26rem] bg-richblack-800 z-50 w-full rounded-xl' ref={ref}>
        
    //     <div>
    //         <div className='flex items-center justify-between p-2 bg-richblack-700'>
    //             <p className='capitalize'>{view ? "viewing" : add ? "adding": edit ? "editing":""} Lecture</p>
    //             <button 
    //                 onClick={
    //                           (e) => { 
    //                                     if(!loading){
    //                                       setModalData(null)
    //                                       e.stopPropagation()
    //                                     }
    //                                   }
    //                         }
    //             >
    //                 <RxCross1 />
    //             </button>
    //         </div>

    //         <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
                
    //             <Upload 
    //                 name="lectureVideo"
    //                 label="Lecture video"
    //                 register={register}
    //                 errors={errors}
    //                 setValue={setValue}
    //                 video={true}
    //                 viewData={view? modalData?.videoUrl : null}
    //                 editData={edit? modalData?.videoUrl : null}
    //             />

    //             <div>
    //               <label htmlFor="lectureTitle">Lecture title</label>
    //               <input 
    //                     id='lectureTitle'
    //                     name='lectureTitle'
    //                     {...register("lectureTitle", {required : true})}
    //                     className='w-full text-pure-greys-900'
    //               />
    //               {
    //                   errors.lectureTitle && (
    //                     <span>lecture title is required</span>
    //                   )
    //               }
    //             </div>

    //             <div>
    //               <label htmlFor="lectureDescription">Lecture description</label>
    //               <textarea 
    //                     id='lectureDescription'
    //                     name='lectureDescription'
    //                     {...register("lectureDescription", {required : true})}
    //                     className='w-full min-h-[130px] text-pure-greys-900'
    //               />
    //               {
    //                   errors.lectureDescription && (
    //                     <span>lecture description is required</span>
    //                   )
    //               }
    //             </div>

    //             <div>
    //               {  !view ? 
    //                   <IconBtn
    //                     text={loading ? "Loading..." : edit ? "Save changes" : add ? "Save" : ""}
    //                     customClasses={"bg-yellow-50"}
    //                 />:
    //                 (<></>)
    //               }
    //             </div>
    //         </form>
    //     </div>


    //   </div>
    // </>

    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Lecture Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                customClasses={"bg-yellow-50"}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal