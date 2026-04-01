import db from "../client.js";
export async function getGreeting() {
    const SQL = "SELECT * FROM greetings;";
    const {
      rows: [greeting],
    } = await db.query(SQL);
    if (!greeting) throw new Error("not found");
    return greeting;
  } 

export async function insertGreeting(message){
  await db.query(`INSERT INTO greetings (message)
    VALUES('Hello World');`)
    return greeting;
}

export async function seed() {
  await db.query(`DROP TABLE IF EXISTS greetings;`);

  await db.query(`CREATE TABLE greetings(
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL);
        `);
  await db.query(`INSERT INTO greetings (message)
    VALUES('Hello World');`);
}
