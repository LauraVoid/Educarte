var express = require("express");
var router = express.Router();
const authJwt = require("../middleware/authJws");
const course_controller = require("../controllers/course-controller");

/* GET home page. */
router.get("/", [authJwt.verifyToken, authJwt.isInst], course_controller.index);
router.get("/count", course_controller.count);
router.get(
  "/all/:instId",
  [authJwt.verifyToken, authJwt.isInst],
  course_controller.findInstitutionCourses
);
router.get(
  "/:id",
  [authJwt.verifyToken, authJwt.isInst],
  course_controller.findByCourseId
);
router.get(
  "/find/:instId",
  [authJwt.verifyToken, authJwt.isInst],
  course_controller.findTeacherByInstitutionId
);
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isInst],
  course_controller.create
);
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isInst],
  course_controller.update
);
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isInst],
  course_controller.delete
);
router.get("/teacher/:id", [
  authJwt.verifyToken,
  authJwt.isAdmin,
  course_controller.findCoursesByTeacher,
]);

module.exports = router;
