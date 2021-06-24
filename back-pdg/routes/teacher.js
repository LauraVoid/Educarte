var express = require("express");
var router = express.Router();
var teachers_controller = require("../controllers/teacher-controller");
const authJwt = require("../middleware/authJws");

/* GET home page. */
router.get("/", teachers_controller.index);
router.get("/all/:id", teachers_controller.all);
router.get("/count", teachers_controller.count);
router.post("/", teachers_controller.create);
router.delete("/:id", teachers_controller.delete);
router.put("/", teachers_controller.update);
router.get("/parents/:teacherId", teachers_controller.findParentsKnown);
router.get("/courses/:teacherId", teachers_controller.findCoursesByTeacher);
router.get(
  "/students/:teacherId",
  [authJwt.verifyToken, authJwt.isAdmin],
  teachers_controller.findStudentsByTeacher
);
router.get(
  "/students/count/:teacherId",
  [authJwt.verifyToken, authJwt.isAdmin],
  teachers_controller.countStudentsByTeacher
);
module.exports = router;

router.get(
  "/students/alt/:teacherId",
  [authJwt.verifyToken, authJwt.isAdmin],
  teachers_controller.findStudentsByTeacher2
);
