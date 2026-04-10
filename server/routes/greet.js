import express from "express";
import { getGreetings, seedGreetings } from "../db/queries/greetings.js";
import requireUser from "#middleware/requireUser";

const greetRouter = express.Router();

greetRouter.get("/seed", async (req, res) => {
  try {
    await seedGreetings();
    res.status(200).send("greetings seeded");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

greetRouter.get("/", requireUser, async (req, res) => {
  try {
    const greetings = await getGreetings();
    res.status(200).json(greetings[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default greetRouter;
