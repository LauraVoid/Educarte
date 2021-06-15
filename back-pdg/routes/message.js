var express = require("express");
var router = express.Router();
const authJwt = require("../middleware/authJws");
var message_controller = require("../controllers/message-controller");

/* GET home page. */
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  message_controller.create
);
module.exports = router;
