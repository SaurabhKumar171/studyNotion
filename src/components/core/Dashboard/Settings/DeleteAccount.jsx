import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { FiTrash2 } from "react-icons/fi";
import {deleteUser} from "../../../../services/operations/settingsAPI"
import ConfirmationModal from '../../../common/ConfirmationModal'

const DeleteAccount = ({setConfirmationModal}) => {

    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) =>  state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

  return (
    <section className=''>
        <div className='bg-pink-900 flex flex-col sm:flex-row items-center sm:items-start p-2 px-4 sm:p-6 rounded-lg gap-x-4'>
            <div 
                className='rounded-3xl text-2xl bg-pink-700 p-3 text-pink-200 cursor-pointer'
                onClick={() => setConfirmationModal({
                    text1: "Are You Sure ?",
                    text2: "Your account will be removed permanently.",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(deleteUser(token, navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                })}
            >
                <FiTrash2/>
            </div>
            <div className='flex flex-col font-inter gap-y-2 w-10/12'>
                <p className='text-lg font-semibold text-pink-5 text-center sm:text-left'>Delete Account</p>
                <div className='flex flex-col text-sm'>
                    <p className='text-center sm:text-left'>Would you like to delete account?</p>
                    <p className='text-center sm:text-left'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                </div>
                <p className='text-pink-300 text-md italic text-center sm:text-left'>I want to delete my account.</p>
            </div>
        </div>
    </section>
  )
}

export default DeleteAccount