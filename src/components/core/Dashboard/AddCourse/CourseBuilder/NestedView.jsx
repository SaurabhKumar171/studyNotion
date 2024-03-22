import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from 'react-icons/md';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {BiSolidDownArrow} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai';
import SubSectionModal from './SubSectionModal';
import Overlay from '../../../../common/Overlay';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import ConfirmationModal from '../../../../common/ConfirmationModal';

const NestedView = ({handleChangeEditSectionName}) => {

    const { course } = useSelector((state)=> state.course);
    const { token } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId)=>{
        const result = await deleteSection({
            sectionId,
            courseId : course._id,
            token,
        }) 

        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({
            subSectionId,
            sectionId,
            token,
        }) 

        if(result){
            const updatedCourseContent = course.courseContent.map((section)=>
              section._id === sectionId ? result : section
            );
            
            const updatedCourse = {...course, courseContent: updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }

  return (
    <div className='text-richblack-50 relative'>
        
        <div className='mt-10 rounded-lg bg-richblack-700 p-6 px-8'>
            {
                course?.courseContent.map((section) => (
                    <details key={section._id} open>
                        
                        <summary className='flex justify-between items-center gap-x-3 border-b-[0.3px] border-richblack-400 pb-2'>
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu className='text-richblack-400'/>
                                <p>{section?.sectionName}</p>
                            </div>
                            <div className='flex items-center gap-x-3 text-richblack-400'>
                                <button 
                                    onClick={() => handleChangeEditSectionName(section.sectionName, section._id)}
                                >
                                    <MdEdit />
                                </button>

                                <button 
                                    onClick={
                                        ()=>{
                                                setConfirmationModal({
                                                    text1: `Are you sure you want to delete ${section?.sectionName}`,
                                                    text2: "All the lectures in this sections will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSection(section?._id),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                })
                                            }
                                    }
                                >
                                    <RiDeleteBin6Line />
                                </button>

                                <span>|</span>
                                <BiSolidDownArrow className='text-xl richblack-300'/>
                            </div>
                        </summary>

                        <div className="mb-4">
                            {
                                section?.subSection.map((data)=>(
                                    
                                    <div 
                                        key={data?._id}
                                        onClick={()=>setViewSubSection(data)}
                                        className='flex items-center justify-between gap-x-3 border-b-2'
                                    >
                                        <div className='flex items-center gap-x-3'>
                                            <RxDropdownMenu />
                                            <p>{data?.title}</p>
                                        </div>

                                        <div 
                                            className='flex items-center gap-x-3'
                                            onClick={e=> e.stopPropagation()}
                                        >
                                            <button 
                                                onClick={()=> setEditSubSection({...data, sectionId: section?._id})}
                                            >
                                                <MdEdit />
                                            </button>

                                            <button 
                                                onClick={
                                                    ()=>{
                                                            setConfirmationModal({
                                                                text1: `Are you sure you want to delete  ${data?.title} from ${section?.sectionName}`,
                                                                text2: "This lecture will be deleted",
                                                                btn1Text: "Delete",
                                                                btn2Text: "Cancel",
                                                                btn1Handler: () => handleDeleteSubSection(data?._id, section?._id),
                                                                btn2Handler: () => setConfirmationModal(null),
                                                            })
                                                        }
                                                }
                                            >
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>
                                        
                                    </div>
                                ))
                            }

                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className='mt-4 flex items-center gap-x-2 text-yellow-50 text-sm'
                            >
                                <AiOutlinePlus />
                                <p>Add lecture</p>
                            </button>
                        </div>
                    </details>
                ))
            }
        </div>

        {
            addSubSection ? 
            (
                <SubSectionModal
                        modalData = {addSubSection}
                        setModalData = {setAddSubSection}
                        add={true}
                /> 
            )
            : editSubSection ? 
            (
                <SubSectionModal
                        modalData = {editSubSection}
                        setModalData = {setEditSubSection}
                        edit={true}
                /> 
            )
            : viewSubSection ? 
            (
                <SubSectionModal
                        modalData = {viewSubSection}
                        setModalData = {setViewSubSection}
                        view={true}
                /> 
            )
            : (<div></div>)
        }

        {
            confirmationModal ? (
                <>
                    <Overlay/> 
                    <ConfirmationModal modalData={confirmationModal} modalFor={"deleteCourse"}/>
                </>
            ) : (
                <div></div>
            )
        }
    </div>
  )
}

export default NestedView