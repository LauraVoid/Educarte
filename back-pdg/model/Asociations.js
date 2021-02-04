const Institution = require("./Institution");
const Course = require("./Course");

Institution.hasMany(Course);
Course.belongsTo(Institution);
