import { getGreeting, seed } from "./db/queries/greetings.js";
import express from "express";
import db from "./db/client.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/greet", helloWorld);

app.get("/seed", seedDatabase);

async function seedDatabase(req, res) {
  try {
    await seed();
    res.send("database seeded");
  } catch (error) {
    res.status(500).json(error.message);
  }
}
async function helloWorld(req, res) {
  try {
    const greeting = await getGreeting();
    res.status(200).json(greeting);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

await db.connect();

app.listen(PORT, () => {
  console.log("Listening on PORT 3001");
});
