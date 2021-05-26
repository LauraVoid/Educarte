var express = require('express');
var router = express.Router();
const content_controller = require("../controllers/content-controller");

/* GET home page. */
router.get("/",content_controller.index);
router.get("/filter/:cat",content_controller.filter)
module.exports = router;
