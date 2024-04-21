import React, { useState, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";

const ChipInput = ({name, label, placeholder, register, errors, setValue, getValues, editCourse}) => {

  const [tag, setTag] = useState("");
  const [tagsList, setTagsList] = useState([]);


    useEffect(()=> {
        register(name, {
            required:true,
            validate: (value) => value.length > 0
        })
    },[])

    useEffect(()=>{
      if(editCourse){
        const currentValues = getValues();
        const fetchedTags = currentValues?.courseTags;
        console.log("fetchedTags tags...",fetchedTags);

        // Parse each element in fetchedTags to remove square brackets
        // const tagsWithoutBrackets = fetchedTags.map(tag => JSON.parse(tag));
        // console.log("tagsWithoutBrackets tags...",tagsWithoutBrackets);
        // setTagsList(tagsWithoutBrackets || []);
      }
    },[])

    useEffect(()=> {
        setValue(name, tagsList);
    },[tagsList])

    const handleAddTags = (e) => {
      if (e.target.value.endsWith(',') || e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission if user pressed enter
        if (tag.trim() !== '') {
          setTagsList([...tagsList, tag.trim()]);
          setTag('');
        }
      } else {
        setTag(e.target.value);
      }
    };

    const handleRemoveTags = (index) => {
      const updatedTagList = [...tagsList];
      updatedTagList.splice(index, 1);
      setTagsList(updatedTagList);
    }

  return (
    <div>
      {
        <div className='text-white flex gap-x-2 flex-wrap'>
            {
              tagsList.length > 0 && (
                tagsList.map((tag, index)=> (
                  <span key={index} className='flex items-center gap-x-1 bg-yellow-500 mb-2 text-richblack-25 rounded-3xl p-1 px-2'>
                    <p>{tag}</p>
                    <p className='text-white cursor-pointer' onClick={() => handleRemoveTags(index)}>
                      <RxCross2 />
                    </p>
                  </span>
                ))
              )
            }
        </div>
      }
      <label htmlFor={name}>{label}<sup>*</sup></label>
      <div>
        <input 
            name={name}
            type="text" 
            placeholder={placeholder}
            id={name}
            value={tag}
            onChange={(e) => handleAddTags(e)}
            onKeyDown={(e) => handleAddTags(e)}
            className='w-full form-style'
        />
      </div>
      {
        errors[name] && (
              <span className="ml-2 text-xs tracking-wide text-pink-200" role="alert">
                  {label} is required
              </span>
          )
      }
    </div>
  )
}

export default ChipInput