const express = require("express");
const { handlesignup, handlelogin } = require("../controllers/user");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup", { Error: null });
});
router.get("/login", (req, res) => {
  res.render("login", { Error: null });
});
router.post("/signup", handlesignup);
router.post("/login", handlelogin);

module.exports = router;
