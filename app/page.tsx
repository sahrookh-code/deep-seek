'use client';
import Sidebar from "@/components/sidebar";
import { useState } from "react";
import Image from "next/image";
import PromptBox from "@/components/PromptBox";
import MessageComponent from "@/components/Message";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleMenuClick = () => setExpand(!expand);
  
  return (
    <div>
      <div className="flex h-screen bg-[#1a1a1a] bg-[url('/assets/deep-seek.jpg')] bg-cover bg-fixed bg-center">
        <Sidebar expand={expand} setExpand={setExpand}/>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d]/60 text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image 
              onClick={handleMenuClick} 
              className="rotate-180 cursor-pointer" 
              src="/assets/menu_icon.svg" 
              alt="Toggle menu" 
              width={30} 
              height={30} 
            />
            <Image 
              className="opacity-70" 
              src="/assets/chat_icon.svg" 
              alt="Chat icon" 
              width={30} 
              height={30} 
            />
          </div>
          
          {messages.length === 0 ? (
            <>
            
              <div className="flex items-center gap-3">
                <Image 
                  src="/assets/logo_icon.svg" 
                  alt="Deep-Seek Logo" 
                  width={64} 
                  height={64} 
                  className="h-16 w-auto" 
                />
                <p className="text-2xl font-medium">Hi, I am Sahrookh</p>
              </div>
              <p className="text-m mt-1"> How can I help you today?</p>
              
            </>
          ) : (
            <div>
             <MessageComponent role="user" content="What is next js" />
            </div>
          )
        }
          
          <PromptBox 
            isLoading={isLoading} 
            setIsLoading={setIsLoading}
            messages={messages}
            setMessages={setMessages}
          />
          <p className="text-xs absolute bottom-1 text-white/80">AI-Generated, for reference only</p>
        </div>
      </div> 
    </div>
  );
}
