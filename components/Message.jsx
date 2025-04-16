import Image from 'next/image'
import React from 'react'

const Message = ({role, content}) => {
  return (
    <div className='flex flex-col items-center w-full max-w-3xl text-sm'>
        <div className={`flex flex-col w-full mb-8 ${role === 'user' && 'items-end'}`}>
            <div className={`group relative flex max-w-2xl py-3 rounded-xl ${role === 'user ' ? 'bg-[#414158] px-5' : 'gap-3'}`}>
                <div className={`opacity-0 group-hover:opacity-100 absolute ${role === 'user' ? '-left-16 top-2.5' : 'left-9 -bottom-6'} transition-all`} >
                    <div className=' flex items-center gap-2 opacity-70'>
                        {
                            role==='user' ? (
                                <>
                                    <Image src={"/assets/copy_icon.svg"} alt=''  width={16} height={16} className='w-4 cursor-poniter'/>
                                    <Image src={"/assets/pencil_icon.svg"} alt=''  width={16} height={16} className='w-4.5 cursor-poniter'/>
                                </>
                            ):(
                                <>
                                    <Image src={"/assets/copy_icon.svg"} alt=''  width={16} height={16} className='w-4.5 cursor-poniter'/>
                                    <Image src={"/assets/regenerate_icon.svg"} alt=''  width={16} height={16} className='w-4 cursor-poniter'/>
                                    <Image src={"/assets/like_icon.svg"} alt=''  width={16} height={16} className='w-4 cursor-poniter'/>
                                    <Image src={"/assets/dislike_icon.svg"} alt=''  width={16} height={16} className='w-4 cursor-poniter'/>
                                </>
                            )
                        } 
                        
                       
                    </div>

                </div>
                {
                    role === 'user' ? 
                    (
                        <span className='=text-white/90'>{content}</span>
                    )
                    :
                    (
                        <>
                            <Image 
                                src="/assets/logo_icon.svg" 
                                alt="AI Logo" 
                                width={40}
                                height={40}
                                className='w-10 h-10 border border-white/15 rounded-full p-1.5'
                            />
                            <div className='space-y-4 w-full overflow-scroll'>
                                {content}
                            </div>
                        </>
                        
                    )

                }

            </div>



        </div>
      
    </div>
  )
}

export default Message
