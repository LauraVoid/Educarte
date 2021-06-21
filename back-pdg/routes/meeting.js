var express = require("express");
var router = express.Router();
const authJwt = require("../middleware/authJws");
var meeting_controller = require("../controllers/meeting-controller");

/* POST homework. */
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  meeting_controller.create
);
router.get("/:id",meeting_controller.index);
module.exports = router;
