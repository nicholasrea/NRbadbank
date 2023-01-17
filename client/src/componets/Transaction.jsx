import React, { useContext, useState, useRef, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import AuthContext from "../auth/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Transaction(props) {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState();
  const { token, user, updateUser } = useContext(AuthContext);
  const transactionRef = useRef();

  //sets the base url i.e. <---  Config, ? .env variable?
  const client = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  function blanceSettter() {
    setBalance(user.balance);
  }

  //TODO, Write transaction validation logic
  function validateTransaction(bal, trans) {
    if (bal < 0)
      throw new Error("Please enter a vaild number for transaction!");
    if (trans > bal && props.id === "withdraw")
      throw new Error("Insuffiecnet Funds");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transaction = transactionRef.current.value;
      setLoading(true); //disables button
      validateTransaction(balance, transaction);
      const data = { user, amount: transaction };
      const response = await client.post(`/${props.id}`, data); // for deposit or withdraw
      if (response.status === 500) {
        throw new Error(response.status.error);
      }
      updateUser(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Reloads when the user object updates.
  useEffect(() => {
    blanceSettter();
  }, [user]);

  return (
    <>
      <Card>
        <Card.Header className="text-center mb-4">
          Current Balance: ${balance}
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="transaction" />
            <Form.Label>Enter amount for {props.placeholder}</Form.Label>
            <Form.Control type="number" ref={transactionRef} required />
            <Button className="w-100 mt-4" disabled={loading} type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Want to make a {props.opp}? <Link to={props.link}>{props.opp}</Link>
      </div>
    </>
  );
}
