import db from "../client.js";
import bcrypt from "bcryptjs";

export async function getUsers() {
  const SQL = "SELECT id, firstName, lastName, email FROM users;";
  const { rows } = await db.query(SQL);
  return rows;
}

export async function getUserByEmailAndPassword(email, password) {
  const sql = `
  SELECT *
  FROM users
  WHERE email = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [email]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return user;
}

export async function getUserById(id) {
  const {
    rows: [user],
  } = await db.query(`SELECT id, firstName, email FROM users WHERE id = $1`, [
    id,
  ]);

  return user;
}

export async function createUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const {
    rows: [newUser],
  } = await db.query(
    `INSERT INTO users(firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *`,
    [user.firstName, user.lastName, user.email, hashedPassword],
  );

  return newUser;
}

export async function seedUsers() {
  await db.query(`DROP TABLE IF EXISTS users;`);

  await db.query(`CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL);
        `);
  await createUser({
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    password: "password123",
  });
}
