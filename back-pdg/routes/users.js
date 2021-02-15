var express = require('express');
var router = express.Router();
const authJwt = require("../middleware/authJws");
const controller = require("../controllers/user-controller");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get(
  "/api/test/teac",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);
module.exports = router;
