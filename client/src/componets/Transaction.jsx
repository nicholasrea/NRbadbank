import React, { useContext, useState, useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";
import AuthContext from "../auth/AuthContext";
import axios from "axios";

export default function Transaction(props) {
  const [loading, setLoading] = useState(false);
  const { token, user } = useContext(AuthContext);
  const transactionRef = useRef();
  
  //sets the base url i.e. <---  Config, ? .env variable?
  const client = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Authorization": "Bearer "+ token
    }
  });

  //TODO, Write transaction validation logic
  function validateTransaction(balance, transaction) {

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transaction = transactionRef.current.value;
      setLoading(true); //disables button
      const data = { email:user.email, amount: transaction };
      validateTransaction(user.balance, transaction);
      const response = await client.post(`/deposit`, data);
      if (response.status === 500) {
        throw new Error(response.status.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card>
        <Card.Header className="text-center mb-4">
          Current Balance: ${user.balance}
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="transaction" />
            <Form.Label>Enter amount for DEPOSIT</Form.Label>
            <Form.Control type="number" ref={transactionRef} required />
            <Button className="w100 mt-4" disabled={loading} type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
