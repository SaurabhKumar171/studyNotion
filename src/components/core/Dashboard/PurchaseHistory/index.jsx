import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPurchaseHistory } from '../../../../services/operations/courseDetailsAPI';
import {convertUrlToBreadcrumb} from '../../../../utils/convertUrlToBreadcrumb';
import { HiOutlineDotsVertical } from "react-icons/hi";
import ProgressBar from "@ramonak/react-progress-bar";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

const PurchaseHistory = () => {

    const location = useLocation();
    const {token} = useSelector((state)=> state.auth);
    const [purchaseHistory, setPurchaseHistory] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const purchasedHistory = async () => {
            const result = await getPurchaseHistory(token);
    
            console.log("Purchase result", result);
            if(result){
                setPurchaseHistory(result);
            }
        }

        purchasedHistory();
    },[])

  return (
    <div className='text-white pl-7 pt-4 flex flex-col gap-4'>
      <div className='rounded-lg'>
          <div>
              <span className="text-richblack-300 capitalize text-sm">{`Home   /   Dashboard   /   `}</span>
              <span className='text-yellow-50'>{convertUrlToBreadcrumb(location.pathname)}</span>
          </div>
          <h1 className='text-richblack-5 font-inter text-2xl mt-3 capitalize'>
              purchase history
          </h1>
      </div>

      <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
          <Tr className="flex justify-between rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Purchased on
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {purchaseHistory?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            purchaseHistory?.map((course, index) => (
              course?.courseDetails ?
              (
                <Tr
                  key={index}
                  className="flex justify-between border-b border-richblack-800 px-6 py-8"
                >
                  <Td className="text-sm font-medium text-richblack-100">
                      <div>
                          <img src={course?.courseDetails?.thumbnail} alt={`course-${course?.courseDetails?.thumbnail}`} width={50} height={50} className="rounded"/>
                          <p>{course?.courseDetails?.courseName}</p>
                      </div>
                  </Td>
                  <Td className="text-sm font-medium text-richblack-100">
                    {
                      new Date(course?.purchaseDate).toLocaleString("en-GB", {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                      })
                    }
                  </Td>
                  <Td className="text-sm font-medium text-richblack-100 ">
                      ₹{course?.price}
                  </Td>
                </Tr>
              ) : null
            ))
          )}
        </Tbody>
      </Table>
    </div>
  )
}

export default PurchaseHistory;
