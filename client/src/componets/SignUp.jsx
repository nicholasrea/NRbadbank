import React, { useRef, useState, useContext } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import AuthContext from "../auth/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  //declare state, and use react Ref's
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useContext(AuthContext); // get access to local context
  let navigate = useNavigate();

  //sets the base url i.e. <---  Config, ? .env variable?
  //TODO: Possibly Extract the axios client creation out so I future edits can be consolidated
  const client = axios.create({
    baseURL: "https://badbankapi.onrender.com",
  });

  //callback function to hanndle the call to the back end
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // disables submit button
      const data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const response = await client.post("/signup", data);
      const { token, user } = response.data;
      try {
        await signIn(token, user); // sets context
      } catch (error) {
        console.error(error);
        setError(error);
      }
      alert('Thank you for Creating an Account')
      navigate("/"); //reroutes to homepage
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
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
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
