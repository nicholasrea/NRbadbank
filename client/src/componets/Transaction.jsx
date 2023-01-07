import React, { useContext } from 'react'
import AuthContext from '../auth/AuthContext' 

export default function Transaction() {
const { user } = useContext(AuthContext)

  return (
    <>
      <div>Transaction</div>
      <h1>{user.email}</h1>
    </>

  )
}
