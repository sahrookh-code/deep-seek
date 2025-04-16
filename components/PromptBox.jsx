import Image from 'next/image'
import React from 'react'
import { useState } from 'react'

const PromptBox = ({ isLoading, setIsLoading, messages, setMessages }) => {
    const [prompt, setPrompt] = useState('');
    
    return (
        <form className={`w-full ${messages.length > 0 ? "max-w-3xl": "max-w-2xl"} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
            <textarea 
                className='outline-none resize-none overflow-hidden break-words bg-transparent w-full' 
                rows={2} 
                placeholder='Message Deep-Seek' 
                required 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
            />
            <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2'>
                    <p className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                        <Image 
                            className='h-5 w-5'
                            src="/assets/deepthink_icon.svg" 
                            alt='DeepThink'
                            width={20}
                            height={20}
                        />
                        DeepThink (R1)
                    </p>
                    <p className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                        <Image 
                            className='h-5 w-5'
                            src="/assets/search_icon.svg" 
                            alt='Search'
                            width={20}
                            height={20}
                        />
                        Search
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <Image 
                        className='w-4 cursor-pointer'
                        src="/assets/pin_icon.svg" 
                        alt='Pin'
                        width={16}
                        height={16}
                    />
                    <button type="submit" className={`${prompt ? "bg-primary" : "bg-[#71717a]"} rounded-full p-2 cursor-pointer`}>
                        <Image 
                            className='w-3.5 aspect-square'
                            src={prompt ? "/assets/arrow_icon.svg" : "/assets/arrow_icon_dull.svg"}
                            alt='Send'
                            width={14}
                            height={14}
                        />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PromptBox
