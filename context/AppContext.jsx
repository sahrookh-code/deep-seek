"use client"

import { createContext, useContext, useState } from 'react'
import { useUser } from '@clerk/nextjs'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const { user } = useUser()
  const [currentChat, setCurrentChat] = useState(null)

  const value = {
    user,
    currentChat,
    setCurrentChat
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }
  return context
}