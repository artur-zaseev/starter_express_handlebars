import path from "path";
import url from "url";
import "dotenv/config";
import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import createSQLiteSessionStore from "connect-sqlite3";
import passport from "passport";

import { db } from "./database/db.js";

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

const SQLiteStore = createSQLiteSessionStore(session);
const sessionStore = new SQLiteStore({ db: "sessions.db" });

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 30 * 24 * 60 * 60 * 1000 }, // One month
    store: sessionStore,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);

app.get("/api/users", async (req, res) => {
  const result = await db.get("SELECT * FROM users");
  return res.status(200).json(result);
});

app.listen(3000, () => {
  console.log("Server start on port 3000");
});
