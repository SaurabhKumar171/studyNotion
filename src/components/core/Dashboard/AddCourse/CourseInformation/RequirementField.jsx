import React, { useEffect, useState } from 'react'

const RequirementField = ({name, label, register, errors, setValue, getValues, placeholder, editCourse}) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);


    useEffect(()=> {
        register(name, {
            required:true,
            validate: (value) => value.length > 0
        })
    },[])

    useEffect(()=>{
        if(editCourse){
          const currentValues = getValues();
          console.log("req fie...",currentValues);
          const fetchedTags = currentValues?.courseTags;
          setRequirementList(fetchedTags || []);
        }
      },[])

    useEffect(()=> {
        setValue(name, requirementList);
    },[requirementList])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

  return (
    <div>

        <label htmlFor={name}>{label}<sup>*</sup></label>
        <div>
            <input
                type='text'
                id={name}
                placeholder={placeholder}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='w-full form-style'
            />
            <button
            type='button'
            onClick={handleAddRequirement}
            className='font-semibold text-yellow-50'>
                Add
            </button>
        </div>

        {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((requirement, index) => (
                            <li key={index} className='flex items-center text-richblack-5 gap-x-2'>
                                <span>{requirement}</span>
                                <button
                                type='button'
                                onClick={() => handleRemoveRequirement(index)}
                                className='text-xs text-pure-greys-300'>
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {errors[name] && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
                {label} is required
            </span>
        )}
      
    </div>
  )
}

export default RequirementField
