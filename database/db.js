import sqlite3 from "sqlite3";
import { open } from "sqlite";

sqlite3.verbose();

export const db = await open({
  filename: "./database/db.sqlite3",
  driver: sqlite3.Database,
});
