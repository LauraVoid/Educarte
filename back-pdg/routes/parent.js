var express = require("express");
var router = express.Router();
var parent_controller = require("../controllers/parent-controller");
const authJwt = require("../middleware/authJws");

router.get(
  "/teachers/:parentId",
  [authJwt.verifyToken, authJwt.isParent],
  parent_controller.findTeachersKnown
);

module.exports = router;
