var express = require("express");
var router = express.Router();
var teachers_controller = require("../controllers/teacher-controller");

/* GET home page. */
router.get("/", teachers_controller.index);
router.get("/count", teachers_controller.count);
router.post("/", teachers_controller.create);
router.delete("/:id", teachers_controller.delete);
router.put("/", teachers_controller.update);
router.get("/parents/:teacherId", teachers_controller.findParentsKnown);
router.get("/courses/:teacherId", teachers_controller.findCoursesByTeacher);
module.exports = router;
