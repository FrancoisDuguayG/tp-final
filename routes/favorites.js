var express = require("express");
var user_act = require("../controllers/users");
var router = express.Router();

router.post("/", user_act.addFavorite);
router.delete("/:id", user_act.removeFavorite);

module.exports = router;