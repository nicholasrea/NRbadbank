import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express, { json } from "express";
import { verify, sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";
import { createUser, getUserByUsername, updateUserBalance } from "./dal"; // A module that handles database queries

const app = express();

app.use(json()); // Parse JSON payloads in request bodies

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET; // A secret used to sign JWTs

// Middleware function to authenticate user using JWT
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided" });
  }
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
  }
};

// Sign up a new user
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await hash(password, 10); // Hashes the password, so username and Password aren't stored in the same DB
    const user = await createUser(email, hashedPassword);
    const token = sign({ userId: user._id }, JWT_SECRET); // Creates a JWT for the user
    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error signing up user" });
  }
});

// Sign in a user
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByUsername(email); // Gets the user from the database by email
    if (!user) {
      return res.status(401).send({ error: "Invalid email or password" });
    }
    const passwordMatches = await compare(password, user.password); // Compares the hashed password to the password provided by the user
    if (!passwordMatches) {
      return res.status(401).send({ error: "Invalid email or password" });
    }
    const token = sign({ userId: user._id }, JWT_SECRET); // Creates a JWT for the user
    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error signing in user" });
  }
});

// Deposit funds into the authenticated user's account
app.post("/deposit", authenticate, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await getUserByUsername(req.userId);
    user.balance += Number(amount);
    await updateUserBalance(user);
    res.send("Deposit successful");
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error depositing funds" });
  }
});

// Withdraw funds into the authenticated user's account
app.post("/withdraw", authenticate, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await getUserByUsername(req.userId);
    user.balance -= Number(amount);
    await updateUserBalance(user);
    res.send("Deposit successful");
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error depositing funds" });
  }
});

// Log out the authenticated user
app.post("/logout", authenticate, (req, res) => {
  // In a real application, you would invalidate the JWT here
  res.send({ message: "Successfully logged out" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
