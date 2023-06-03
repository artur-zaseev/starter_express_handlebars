import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    user: req.user,
  });
});

router.get("/profile", (req, res) => {
  res.render("profile", {
    user: req.user,
  });
});

export default router;
