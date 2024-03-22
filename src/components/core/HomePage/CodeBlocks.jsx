import React from 'react'
import CTAButton from "../HomePage/Button"
import HighlightText from './HighlightText'
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'
import Blob from './Blob'
import '../../../Styles/HomePage/Blob.css'

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, codeColor, gradient
}) => {
  return (
    <div className={`flex ${position} my-16 lg:my-20 justify-between gap-10`}>
      
    {/*Section 1*/}
    <div className='w-full lg:w-[50%] flex flex-col gap-8'>
        {heading}
        <div className='text-richblack-300 font-medium sm:font-bold '>
            {subheading}
        </div>

        <div className='flex gap-2 xs:gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}  customClasses={"px-3 xs:px-6"}>
                <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                </div>
            </CTAButton>

            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto} customClasses={"capitalize px-3 xs:px-6"}>  
                    {ctabtn2.btnText}
            </CTAButton>
        </div>


    </div>

     {/*Section 2*/}
     <div className=' h-fit  flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px] border-[0.2px] border-solid border-richblack-700 text-[8px] typeAnimate:text-base min-[380px]:text-[12px]' 
          style={{background:'linear-gradient(rgb(9 18 33) 24%, rgb(10 19 33) 38%, transparent)'}}>

        <Blob customClasses={`${gradient}`}/>

        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>

        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
           <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
           
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
            omitDeletionAnimation={true}
           />
        </div>

     </div>


    </div>
  )
}

export default CodeBlocks
