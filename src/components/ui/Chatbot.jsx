import React, { useState } from 'react'
import { BsChat } from "react-icons/bs";
import {  FaTimes } from 'react-icons/fa';
import * as images from '../../assets/image'

const Chatbot = () => {
    const [bot, setBot] = useState(false)
    const toggleBot = () =>{
        setBot((prev)=> !prev)
    }
  return (
   <>
    <div className='w-[4.375rem] h-[4.375rem] rounded-full flex flex-col items-center justify-center bg-[#3D7100] sticky left-[95%] bottom-5' onClick={toggleBot}>
      <BsChat size={30} className='text-white'  />
    </div>
    {
  bot && (
    <div className='fixed top-0 right-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-end'>
      <div className='w-[25rem] flex flex-col justify- h-screen bg-white rounded-t-[1.9rem] p-'>
        <div className='w-full text-white text-lg text-[Inter] flex justify-end px-10 items-center rounded-t-[1.9rem] h-[3.75rem] bg-[#A6D651] '>
                <p>Kommunita Support Bot</p> 
                {/* <span className='ml-auto mr-5 text-lg' onClick={toggleBot}><FaMinus/></span> */}
                <span className='text-lg ml-auto' onClick={toggleBot}><FaTimes /></span>
        </div>
      <div className="px-10 py-5 flex flex-col text-center items-center justify-center">
      <img src={images.logo_new} alt="" />
      <p>Kommunita Support Bot</p>
      <small>Easily find answers to your questions <br /> by chatting with our 24/7 support team</small>

      </div>
     <div className='py-10 px-5'>
     <input type="text" placeholder='message' className='mx-auto border-[#D9D9D9]  w-full rounded-full' />
     </div>
      </div>
    </div>
  )
}

    
   </>
  )
}

export default Chatbot
