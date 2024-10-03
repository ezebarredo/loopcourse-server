import { Router } from "express";
import type { Request, Response } from "express";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = Router();

// In production, use an environment variable
const SECRET_KEY = "1020304050";

// Mock user database (replace with a real database in production)
const users = [];

// Sign up route
export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
    console.log(users);
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login route
export const Login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
      res.json({ user, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

// Protected route example
// app.get("/protected", authenticateToken, (req, res) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });

// // Middleware to authenticate token
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) return res.sendStatus(403);
//     use "user.id" to fetch user from database and assign it to req.user
//     req.user = user;
//     next();
//   });
// }

router.post("/signup", signUp);
router.post("/login", Login);
export default router;
