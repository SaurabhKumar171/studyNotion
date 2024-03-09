import React, {useState, useEffect} from 'react'
import {FaArrowRight} from "react-icons/fa"
import {Link} from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Blob from '../components/core/HomePage/Blob'
import '../Styles/HomePage/Blob.css'

const Home = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <div>
      {/*Section1  */}
      <div className='relative xs:mx-auto flex flex-col w-11/12 max-w-maxContent items-baseline xs:items-center 
      text-white justify-between'>

        <Link to={"/signup"}>
            <div className=' group mt-8 p-1 xs:mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit'>
                <div className='flex flex-row items-center gap-2 rounded-full px-6 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Become an Instructor</p>
                    <FaArrowRight />
                </div>
            </div>

        </Link>

        <div className='xs:text-center text-4xl font-semibold mt-11'>
            Empower Your Future with
            <HighlightText text={"Coding Skills"} />
        </div>

        <div className='mt-4 w-[95%] xs:w-[90%] xs:text-center text-lg font-medium text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        <div className='flex flex-row gap-2 xs:gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"} customClasses={"px-4 xs:px-6"}> 
                Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"} customClasses={"px-4 xs:px-6"}> 
                Book a Demo
            </CTAButton>
        </div>

        <div className='mx-3 my-12 shadow-blue-200'>
            <video
            muted
            loop
            autoPlay
            >
            <source  src={Banner} type="video/mp4" />
            </video>
        </div>

        {/* Code Section 1 */}
        <CodeBlocks 
            position={windowWidth >= 1024 ? "flex-row" : "flex-col"}
            heading={
                <div className='text-4xl font-semibold'>
                    Unlock Your
                    <HighlightText text={"coding potential"}/>
                    with our online courses
                </div>
            }
            subheading = {
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={
                {
                    btnText: "Try it Yourself",
                    linkto: "/signup",
                    active: true,
                }
            }
            ctabtn2={
                {
                    btnText: "learn more",
                    linkto: "/login",
                    active: false,
                }
            }
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
            codeColor={"text-richblack-50"}
            gradient={"w-[15rem] bg-gradient-to-r from-purple-800 to-orange-normal"}
        />


        {/* Code Section 2 */}
        <CodeBlocks 
            position={windowWidth >= 1024 ? "flex-row-reverse" : "flex-col"}
            heading={
                <div className='text-4xl font-semibold'>
                    Start
                    <HighlightText text={"coding in seconds"}/>
                </div>
            }
            subheading = {
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={
                {
                    btnText: "Continue Lesson",
                    linkto: "/signup",
                    active: true,
                }
            }
            ctabtn2={
                {
                    btnText: "learn more",
                    linkto: "/login",
                    active: false,
                }
            }
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
            codeColor={"text-richblack-50"}
            gradient={"w-[20rem] bg-gradient-to-r from-blue-400 via-cyan-400 to-green-300"}
        />


        <ExploreMore />
      </div>

      {/*Section 2  */}
      <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white '>
                        <CTAButton active={true} linkto={"/signup"} customClasses={"px-4 xs:px-6"}>
                            <div className='flex items-center gap-3' >
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                            
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"} customClasses={"capitalize px-4 xs:px-6"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>

                </div>


            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand"} />
                    </div>

                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                    <div className='text-[16px]'>
                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>
                    <CTAButton active={true} linkto={"/signup"} customClasses={"capitalize"}>
                        <div>
                            Learn more
                        </div>
                    </CTAButton>
                    </div>

                </div>
                
                

                <TimelineSection />

                <LearningLanguageSection />

            </div>

            

      </div>


      {/*Section 3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

            <InstructorSection />

            <h2 className='text-center text-4xl font-semobold mt-10'>review from Other Learners</h2>
            {/* Review Slider here */}
            
      </div>


      {/*Footer */}
      <Footer />

    </div>
  )
}

export default Home
