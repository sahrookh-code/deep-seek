import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const ChatLabel = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer">
      <p className='truncate'>Chat Name Here</p>      
      <div ref={menuRef} className='group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg opacity-0 group-hover:opacity-100'>
        <div onClick={() => setShowMenu(!showMenu)}>
          <Image 
            src="/assets/three_dots.svg" 
            alt='' 
            className="w-4"
            width={16}
            height={16}
          />
        </div>
        {showMenu && (
          <div className='absolute -right-36 top-6 bg-gray-700 rounded-xl w-max p-2'>
            <div className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg'>
              <Image 
                src="/assets/pencil_icon.svg" 
                alt='' 
                className='w-4'
                width={16}
                height={16}
              />
              <p>Rename</p>
            </div>
            <div className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg'>
              <Image 
                src="/assets/delete_icon.svg" 
                alt='' 
                className='w-4'
                width={16}
                height={16}
              />
              <p>Delete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatLabel
