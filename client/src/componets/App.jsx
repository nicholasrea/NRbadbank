import { Container } from "react-bootstrap";
import AuthProvider from "../auth/AuthProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import Transaction from "./Transaction";
import Home from './Home';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "90vh" }}
          >
            <div className="w100" style={{ maxWidth: "400px" }}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </Container>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
