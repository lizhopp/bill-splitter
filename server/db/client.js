import pg from "pg";
const url = process.env.DATABASE_URL || "postgres://example:password@localhost:5432/greetings"
const db = new pg.Client(url);
export default db;