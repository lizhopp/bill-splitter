import { getGreetings, seedGreetings } from "./db/queries/greetings.js";
import { seedUsers, getUserById } from "./db/queries/users.js";
import express from "express";
import db from "./db/client.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/greet", helloWorld);

app.get("/seed", seedDatabase);

app.get("/users/:id", getUser);
/**
 * API Endpoint to Reset the Database to only seeded data
 * @param {*} req 
 * @param {*} res 
 */
async function getUser(req, res) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function seedDatabase(req, res) {
  try {
    await seedGreetings();
    await seedUsers();
    res.send("database seeded");
  } catch (error) {
    res.status(500).json(error.message);
  }
}
async function helloWorld(req, res) {
  try {
    const greetings = await getGreetings();
    res.status(200).json(greetings[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

await db.connect();

app.listen(PORT, () => {
  console.log("Listening on PORT 3001");
});
