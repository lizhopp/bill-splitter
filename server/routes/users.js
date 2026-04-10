import express from "express";
import { getUserById, seedUsers, createUser, getUserByEmailAndPassword } from "../db/queries/users.js";
import {createToken} from "#utils/jwt"

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required.");

  const { firstName, lastName, email, password } = req.body;

  if (!firstName) return res.status(400).send("First name is required.");
  if (!lastName) return res.status(400).send("Last name is required.");
  if (!email) return res.status(400).send("Email is required.");
  if (!password) return res.status(400).send("Password is required.");
  const user = await createUser({ firstName, lastName, email, password });
  const token = await createToken({ id: user.id });
  res.status(201).json({token:token});
});

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmailAndPassword(email, password);
  if (!user) return res.status(401).send("Invalid username or password.");
  const token = await createToken({ id: user.id });
  res.status(200).json({token:token});
});

usersRouter.get("/seed", async (req, res) => {
  try {
    await seedUsers();
    res.status(200).send("users seeded");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

usersRouter.get("/:id", async (req, res) => {
  const user = await getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
});

export default usersRouter;
