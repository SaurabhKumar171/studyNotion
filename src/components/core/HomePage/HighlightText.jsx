import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold bg-gradient-to-b from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent'>
        {" "}
        {text}
        {" "}
    </span>
  )
}

export default HighlightText
