import React, { useState } from 'react'
import AuthContext from './AuthContext'

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const signIn = (jwt, user) => {
    setToken(jwt)
    setUser(user)
    console.log(JSON.stringify(user))
    localStorage.setItem('token', jwt)
  }

  const updateUser = (user) => {
    setUser(user)
   
  }

  const signOut = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ token, user,  signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider