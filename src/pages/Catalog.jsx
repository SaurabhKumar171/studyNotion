import React, { useEffect, useState } from 'react'
import Footer from "../components/common/Footer";
import { useParams } from 'react-router-dom';
import { catalogData, categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import { apiConnector } from '../services/apiconnector';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from 'react-redux';
import Error from "./Error";

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null); 
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);

    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

    if (!loading && !catalogPageData.success) {
      return <Error />
    }

  return (
    <div className='text-white bg-richblack-900'>
    
        <div className='bg-richblack-800'>
            <div className='flex flex-col gap-2 w-9/12 mx-auto '>
                <p className='text-richblack-300 mt-6'>{`Home / Catalog / `}
                    <span className='text-yellow-50'>{catalogPageData?.data?.selectedCategory?.name}</span>
                </p>

                <p className='text-3xl font-small'>{catalogPageData?.data?.selectedCategory?.name}</p>

                <p className="text-richblack-200 mb-6">{catalogPageData?.data?.selectedCategory?.description}</p>
            </div>
        </div>

        <div className=' w-10/12 mx-auto mt-6'>
            {/* section 1 */}
            <div>
                <h1 className='text-3xl font-small'>Courses to get you started</h1>
                <div className='flex gap-x-3'>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                {/* CourseSlider */}
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
                </div>
            </div>

            {/* section 2 */}
            <div>
                <div>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</div>
                {/* CourseSlider */}
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
                </div>
            </div>

            {/* section 3 */}
            <div>
                <div>Frequently bought</div>
                <div className='py-8'>

                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course, index) => (
                                <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                            ))
                        }
                    </div>

                </div>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default Catalog