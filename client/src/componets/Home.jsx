import React, { useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import SignUp from './SignUp'
import Transaction from './Transaction'

export default function Home() {
  const { token, user } = useContext(AuthContext)
  if (token)  return <Transaction />
  else return <SignUp /> 
}
