const express = require("express");
const user_Act = require("../controllers/users");
const router = express.Router();

router.post("/register", user_Act.register);
router.get("/login", user_Act.login);

module.exports = router;
