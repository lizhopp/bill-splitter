import db from "../client.js";

export async function getGreetings() {
  const SQL = "SELECT * FROM greetings;";
  const { rows } = await db.query(SQL);
  return rows;
}

export async function getGreetingById(id) {
  const {
    rows: [user],
  } = await db.query(`SELECT * FROM greetings WHERE id = $1`, [id]);

  return user;
}

export async function createGreeting(message) {
  await db.query(
    `INSERT INTO greetings (message)
    VALUES($1);`,
    [message],
  );
}

export async function seedGreetings() {
  await db.query(`DROP TABLE IF EXISTS greetings;`);

  await db.query(`CREATE TABLE greetings(
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL);
        `);
  await createGreeting("Hello World");
}
