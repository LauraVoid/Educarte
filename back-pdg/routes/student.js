var express = require('express');
var router = express.Router();
var students_controller = require("../controllers/student-controller");

/* GET home page. */
router.get("/",students_controller.index);
module.exports = router;