var express = require('express');
var router = express.Router();
const feedback_controller = require("../controllers/feedback-controller");

/* GET home page. */
router.get("/:EstId",feedback_controller.index);
router.post("/",feedback_controller.create)
module.exports = router;
