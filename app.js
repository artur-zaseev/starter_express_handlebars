import path from "path";
import express from "express";
import { engine } from "express-handlebars";

// Setup
const app = express();
app.engine("handlebars", engine());

// Settings
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (_, res) => {
  res.render("index");
});

app.listen(3000, () => console.log("Server start jn port 3000"));
