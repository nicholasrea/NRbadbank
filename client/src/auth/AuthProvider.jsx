import React, { useState } from 'react'
import AuthContext from './AuthContext'

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  const signIn = (jwt) => {
    setToken(jwt)
    localStorage.setItem('token', jwt)
  }

  const signOut = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider