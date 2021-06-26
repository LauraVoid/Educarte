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

/* POST homework. */
router.get(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  meeting_controller.findMeetingsByTeacher
);

router.get(
  "/count/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  meeting_controller.count
);

router.get(
  "/all/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  meeting_controller.index
);

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  meeting_controller.delete
);

router.get("/find/:id", meeting_controller.index);
module.exports = router;
