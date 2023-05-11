var express = require("express");
var user_act = require("../controllers/users");
var router = express.Router();

router.post("/logout", user_act.logout);
router.get("/tokenInfo", user_act.getInfo);

module.exports = router;