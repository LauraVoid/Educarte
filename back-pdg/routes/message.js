var express = require("express");
var router = express.Router();
var message_controller = require("../controllers/message-controller");

/* GET home page. */
router.post("/", message_controller.create);
module.exports = router;
