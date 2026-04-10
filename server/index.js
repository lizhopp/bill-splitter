import express from "express";
import db from "./db/client.js";
import cors from "cors";
import usersRouter from "./routes/users.js";
import greetRouter from "./routes/greet.js";
import getUserFromToken from "#middleware/getUserFromToken";

const app = express();

const PORT = process.env.PORT || 3001;

//settings
app.use(express.json());
app.use(cors());

//middleware
app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/greet", greetRouter);

await db.connect();

app.listen(PORT, () => {
  console.log("Listening on PORT 3001");
});
