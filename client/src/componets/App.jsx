import { Container } from "react-bootstrap";
import AuthProvider from "../auth/AuthProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import Navigation from "./Navigation";
import Home from './Home';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navigation />
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "90vh" }}
          >
            <div className="w100" style={{ maxWidth: "400px" }}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/deposit" element={<Transacion id='Deposit' />} />
                <Route path="/withdraw" element={<Transacion id='Withdraw' />} /> 
 
              </Routes>
            </div>
          </Container>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
