
const db = {};

db.user = require("./Teacher")
db.student = require("./Student")
db.institution = require("./Institution")
db.parent = require("./Parent")

db.role = require("./Role")
db.ROLES = ["teacher", "teac-assistant"];

module.exports = db;