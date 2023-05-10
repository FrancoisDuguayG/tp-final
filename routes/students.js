var express = require("express");
var student_Act = require("../controllers/students");
var router = express.Router();

router.get("/", student_Act.getStudents);
router.post("/", student_Act.createstudent);
router.patch("/:roll", student_Act.updatestudent);
router.delete("/:roll", student_Act.deletestudent);

module.exports = router;
