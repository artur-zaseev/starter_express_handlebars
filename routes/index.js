import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
  res.render("index");
});

router.get("/profile", (req, res) => {
  res.render("profile", {
    user: req.user,
  });
});

export default router;
