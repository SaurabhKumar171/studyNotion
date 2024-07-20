import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';
import { fetchAllCourses } from '../../../../services/operations/courseDetailsAPI';
import { useSelector } from 'react-redux';

const Cart = () => {

    const location = useLocation();
    const [totalItems, setTotalItems]= useState(0);
    const {token} = useSelector(state=> state.auth) 
    const cart = useSelector(state => state.cart.cart);

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


    useEffect( ()=>{
        const getCartCourses = async () => {
            let response = await fetchAllCourses(token);
            // console.log("The cart courses ==>",response?.courses);
            setTotalItems(response?.courses?.length);
        }

        getCartCourses();
    },[token])

    useEffect(() => {
        setTotalItems(cart.length);
      }, [cart]);

  return (
    <div className="text-richblack-5">
        <div className='rounded-lg ml-7 mt-4'>
          <div>
              <span className="text-richblack-300 capitalize text-sm">{`Home   /   Dashboard   /   `}</span>
              <span className='text-yellow-50'>{convertUrlToBreadcrumb(location.pathname)}</span>
          </div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">Your Cart</h1>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
                {totalItems} Courses in Cart
            </p>
        </div>
        {
            totalItems > 0 ? (
                <div className="mt-8 flex flex-col items-start gap-x-10 gap-y-6 lg:flex-row">
                    <RenderCartCourses setTotalItems={setTotalItems}/>
                    <RenderTotalAmount />
                </div>
            ) : (
                <p className="mt-14 text-center text-3xl text-richblack-100">
                    Your cart is empty
                </p>
        )}
    </div>
  )
}

export default Cart