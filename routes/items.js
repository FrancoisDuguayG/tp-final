var express = require("express");
var item_act = require("../controllers/items");
var router = express.Router();

router.get("/", item_act.getItems);
router.get("/:id", item_act.getItem);

module.exports = router;
