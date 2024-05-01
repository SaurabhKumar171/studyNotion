import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
import { AiFillPlayCircle } from "react-icons/ai";
import IconBtn from '../../common/IconBtn';
// import '~video-react/dist/video-react.css'; // import css

const VideoDetails = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const playerRef = useRef();
  const {token} = useSelector(state=> state.auth);
  const {courseSectionData, courseEntireData, completedLectures} = useSelector(state => state.viewCourse);
  const [videoData , setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    const setVideoSpecificDetails = async() => {
        if(!courseSectionData.length)
          return ;
        if(!courseId && !sectionId && !subSectionId){
          navigate("/dashboard/enrolled-courses")
        }
        else{
          const filteredData = courseSectionData.filter(
            (course)=> course._id === sectionId
          )

          const filteredVideoData = filteredData?.[0]?.subSection.filter(
            (data) => data._id === subSectionId
          )
          setVideoData(filteredVideoData[0])
        }
    }

    setVideoSpecificDetails();
  },[courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionIndex === 0 && currentSubSectionIndex  === 0 )
      return true;

      return false;
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSection = courseSectionData[currentSectionIndex].subSection?.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionIndex === courseSectionData?.length - 1 && 
      currentSubSectionIndex === noOfSubSection -1){
        return true;
      }

      return false;
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSection = courseSectionData[currentSectionIndex].subSection?.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== noOfSubSection - 1){
        // go to next video of same section
        const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSectionIndex + 1]._id;
        // go to to next video
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
      }
    else{
      // go to video of next section
      const nextSectionId = courseSectionData[currentSectionIndex +1];
      const nextSubSectionId = courseSectionData[currentSectionIndex +1].subSection[0]._id;

      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
    
  }

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSection = courseSectionData[currentSectionIndex].subSection?.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionIndex !== 0){
      // go to same section previous video
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex -1]._id;

      // go to to previous video
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else{
      // prev section, last video
      const prevSectionId =  courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection?.length;

      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection?.[prevSubSectionLength - 1]._id;

      // go to to previous video
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion = async() => {
      // dummy code , replace it next time

      setLoading(true);

      // const res = await markLectureAsCompleted(
      //   {
      //     courseId: courseId, 
      //     subSectionId : subSectionId,
      //   },
      //   token
      // );
      
      // state update
      // if(res){
      //   dispatch(updateCompletedLectures(subSectionId));
      // }
      // setLoading(false);
  }

  return (
    <div className='text-white'>
       {
        !videoData  ? 
                (
                  <div>No data found</div>
                ):
                (
                  <Player
                      ref = {playerRef}
                      aspectRation="16:9"
                      playsInline
                      onEnded = {() => setVideoEnded(true)}
                      src={videoData?.videoUrl}
                  >
                      <AiFillPlayCircle />

                      {
                        videoEnded && (
                          <div>
                              {
                                !completedLectures.includes(subSectionId) && (
                                  <IconBtn
                                      disabled = {loading}
                                      onclick={()=> handleLectureCompletion()}
                                      text = {!loading ? "Mark as Completed":"Loading ..."}
                                  />
                                )
                              }

                              <IconBtn 
                                  disabled = {loading}
                                  onclick={()=> {
                                    if(playerRef.current){
                                      playerRef.current.seek(0)
                                      setVideoEnded(false);
                                    }
                                  }}
                                  text= "Rewatch"
                              />

                              <div>
                                {
                                  !isFirstVideo() && (
                                    <button
                                      disabled={loading}
                                      onClick={goToPreviousVideo}
                                      className='blackButton'
                                    >
                                      Prev
                                    </button>
                                  )
                                }

                                {
                                  !isLastVideo() && (
                                    <button
                                      disabled={loading}
                                      onClick={goToNextVideo}
                                      className='blackButton'
                                    >
                                      Next
                                    </button>
                                  )
                                }
                              </div>
                          </div>
                        )
                      }
                  </Player>
                )
       }
      <h1>
          { videoData?.title }
      </h1> 
      <p>
          { videoData?.description }
      </p>
    </div>
  )
}

export default VideoDetails