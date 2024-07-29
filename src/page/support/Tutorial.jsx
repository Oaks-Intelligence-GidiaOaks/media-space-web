import React from 'react'
import TutorialsGrid from './TutorialDrid'

const Tutorial = () => {
  return (
    <>
       <div className="flex flex-col pt-10 items-center justify-center">
        <h1 className="text-[2rem] leading-[4.5rem] font-semibold font-inter">
        Tutorials
        </h1>
        <p className="text-[1rem] px-5 md:px-20">
        Want to learn how to use Kommunita? We have Beginner-friendly tutorials for you.
        </p>
        <div className=''>
          <TutorialsGrid />
        </div>
      </div>


    </>
  )
}

export default Tutorial
