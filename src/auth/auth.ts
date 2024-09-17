import { Router } from "express";
import type { Request, Response } from "express";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = Router();

const SECRET_KEY = "1020304050"; // In production, use an environment variable

// Mock user database (replace with a real database in production)
const users = [];

// Sign up route
export const signUp = async (req: Request, res: Response) => {
  // console.log("HELLOOOOOO");
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send("User registered successfully");
    console.log(users);
  } catch (error) {
    res.status(500).send("Error registering user");
  }
};

router.post("/signup", signUp);
export default router;
