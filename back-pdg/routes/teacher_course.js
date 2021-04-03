var express = require('express');
var router = express.Router();
var teachersCourse_controller = require("../controllers/teacherCourse-controller");

router.post("/",teachersCourse_controller.assignCourse);
module.exports = router;