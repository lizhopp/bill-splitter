import db from "../client.js";
import bcrypt from "bcryptjs";


export async function getUsers() {
  const SQL = "SELECT id, name, email FROM users;";
  const { rows } = await db.query(SQL);
  return rows;
}

export async function getUserById(id) {
  const {
    rows: [user],
  } = await db.query(`SELECT id, name, email FROM users WHERE id = $1`, [id]);

  return user;
}

export async function createUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const {
    rows: [newUser],
  } = await db.query(
    `INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *`,
    [user.name, user.email, hashedPassword],
  );

  return newUser;
}

export async function seedUsers() {
  await db.query(`DROP TABLE IF EXISTS users;`);

  await db.query(`CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL);
        `);
  await createUser({
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  });
}
