import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn';

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
            // TODO:same check (what  else we can do here)
            dispatch(setCourse(result));
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
              // TODO:same check (what  else we can do here)
              dispatch(setCourse(result))
            }

            setModalData(null);
            setLoading(false);
      }  

  return (
    <div>
       
       <div>
          <div>
              <p>{view ? "viewing" : add ? "adding": edit ? "editing":""} Lecture</p>
              <button 
                  onClick={() => (!loading ? setModalData(null): {})}
              >
                  <RxCross1 />
              </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
              
              <Upload 
                  name="lectureVideo"
                  label="lecture video"
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  video={true}
                  viewData={view? modalData?.videoUrl : null}
                  editData={edit? modalData?.videoUrl : null}
              />

              <div>
                 <label htmlFor="lectureTitle">Lecture title</label>
                 <input 
                      id='lectureTitle'
                      name='lectureTitle'
                      {...register("lectureTitle", {required : true})}
                      className='w-full'
                 />
                 {
                    errors.lectureTitle && (
                      <span>lecture title is required</span>
                    )
                 }
              </div>

              <div>
                 <label htmlFor="lectureDescription">Lecture title</label>
                 <textarea 
                      id='lectureDescription'
                      name='lectureDescription'
                      {...register("lectureDescription", {required : true})}
                      className='w-full min-h-[130px]'
                 />
                 {
                    errors.lectureDescription && (
                      <span>lecture description is required</span>
                    )
                 }
              </div>

              <div>
                 <IconBtn
                     text={loading ? "Loading..." : edit ? "Save changes" : "Save"}
                 />
              </div>
          </form>
       </div>


    </div>
  )
}

export default SubSectionModal