var express = require('express');
var router = express.Router();
var course_controller = require("../controllers/course-controller");

/* GET home page. */
router.get("/",course_controller.index);
router.post("/",course_controller.create);
router.put("/",course_controller.update);
router.delete("/",course_controller.delete);

module.exports = router;
