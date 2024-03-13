import React, { useState, useEffect } from 'react'

const ChipInput = ({name, label, placeholder, register, errors, setValue, getValues}) => {

  const [tag, setTag] = useState("");
  const [tagsList, setTagsList] = useState([]);


    useEffect(()=> {
        register(name, {
            required:true,
            validate: (value) => value.length > 0
        })
    },[])

    useEffect(()=> {
        setValue(name, tagsList);
    },[tagsList])

    const handleAddTags = (e) => {
      if ((e.target.value.endsWith(",") || e.key === "Enter") && tag.trim() !== '') {
        setTagsList([...tagsList, tag]);
        setTag("");
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
                  <span key={index} className='flex gap-x-1'>
                    <p>{tag}</p>
                    <p className='text-white cursor-pointer' onClick={() => handleRemoveTags(index)}>remove</p>
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
            className='w-full'
        />
      </div>
      {
        errors[name] && (
              <span>
                  {label} is required
              </span>
          )
      }
    </div>
  )
}

export default ChipInput