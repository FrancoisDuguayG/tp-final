const express = require("express");
const user_Act = require("../controllers/users");
const router = express.Router();

router.post("/signin", user_Act.register);
router.post("/login", user_Act.login);

module.exports = router;
