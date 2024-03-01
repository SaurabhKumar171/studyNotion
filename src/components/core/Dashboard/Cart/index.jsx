import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {

    const location = useLocation();
    const [totalItems, setTotalItems]= useState(1);

    function convertUrlToBreadcrumb(url) {
        const parts = url.split('/');
        const filteredParts = parts.filter(part => part.trim() !== '');

        const breadcrumbs = filteredParts.map((part, index) => {
            const capitalizedPart = part.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            if (index === filteredParts.length - 1) {
                return capitalizedPart;
            }
            return capitalizedPart + ' / ';
        });

        const cleanedBreadcrumb = breadcrumbs.join('').replace('Dashboard / ', '');

        return cleanedBreadcrumb;
    }

  return (
    <div className="text-richblack-5">
        <div className='rounded-lg ml-7 mt-4'>
          <div>
              <span className="text-richblack-300 capitalize text-sm">{`Home   /   Dashboard   /   `}</span>
              <span className='text-yellow-50'>{convertUrlToBreadcrumb(location.pathname)}</span>
          </div>
          <h1 className='text-richblack-5 font-inter text-2xl mt-3 capitalize'>
              your cart
          </h1>
        </div>

        <div className='w-11/12 mt-6'>
            <div className='border-b border-richblack-700 ml-7 mb-4 py-2 text-richblack-400 font-semibold'>
                {totalItems} Courses in Cart
            </div>
            {
                totalItems>0 ?
                (
                <div className='flex justify-between items-start flex-wrap'>
                   <RenderCartCourses/>
                   <RenderTotalAmount/>
                </div>):
                (<p>Your card is empty!</p>)
            }
        </div>
    </div>
  )
}

export default Cart