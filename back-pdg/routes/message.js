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

router.get(
  "/teacher/:teacherId",
  [authJwt.verifyToken, authJwt.isAdmin],
  message_controller.countMessagesTeacher
);

router.get(
  "/teacher/messages/:teacherId",
  [authJwt.verifyToken, authJwt.isAdmin],
  message_controller.findAllMessagesTeacher
);

module.exports = router;
