import { getGreeting } from "./db/queries/greetings.js";
import express from "express";
import db from "./db/client.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/greet", helloWorld);

app.get("/seed", seed);

async function seed(req, res) {
  await db.query(`CREATE TABLE IF NOT EXISTS greetings(
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL);
        `);

  await db.query(`INSERT INTO greetings (message)
    VALUES('Hello World');`);

  res.send("database seeded");
}
async function helloWorld(req, res) {
  try {
    console.log("calling db getGreeting");
    const greeting = await getGreeting();
    res.status(200).json(greeting);
  } catch (error) {
    console.log("error");
  }
}

await db.connect();

app.listen(PORT, () => {
  console.log("Listening on PORT 3001");
});
