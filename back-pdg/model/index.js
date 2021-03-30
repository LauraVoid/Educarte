
const db = {};

db.user = require("./Teacher")
db.student = require("./Student")

db.role = require("./Role")
db.ROLES = ["teacher", "teac-assistant"];

module.exports = db;