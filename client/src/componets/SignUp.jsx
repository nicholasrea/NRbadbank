import React, {useRef, useState } from 'react'
import { Card, Form, Button } from "react-bootstrap"
import AuthContext from '../auth/AuthContext';
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function SignUp() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false)
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = { 
        email: emailRef.current.value, 
        password: passwordRef.current.value 
      }
      console.log(JSON.stringify(data))
      const response = await axios.post('https://badbankapi.onrender.com/signup', data)
      const { token } = response.data  // recieves the token from the sever
      const { signIn } = useContext(AuthContext) // get access to local context
      signIn(token) // passes token to Context 
      alert(`Welcome to the badbank ${data.email}`)

    } catch (error) {
      setError(error)
      console.error(error)
    }
  }
  
   
  return (
    <>
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-4" type="submit">
            Sign Up
          </Button>
        </Form>
      </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
      Already have an account? Log In
    </div>
  </>
  )
}
