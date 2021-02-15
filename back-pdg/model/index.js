
const db = {};

db.user = require("./Teacher")
db.role = require("./Role")
db.ROLES = ["teacher", "teac-assistant"];

module.exports = db;