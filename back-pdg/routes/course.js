var express = require("express");
var router = express.Router();
var course_controller = require("../controllers/course-controller");

/* GET home page. */
router.get("/", course_controller.index);
router.get("/:id", course_controller.findByCourseId);
router.get("/find/:instId", course_controller.findById);
router.post("/", course_controller.create);
router.put("/", course_controller.update);
router.delete("/:id", course_controller.delete);

module.exports = router;
