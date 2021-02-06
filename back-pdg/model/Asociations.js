const Institution = require("./Institution");
const Course = require("./Course");
const Teacher = require("./Teacher");
const Student = require("./Student");
const Content = require("./Content");
const Parent = require("./Parent");
const Role = require("./Role");
const Homework = require("./Homework");
const Teacher_Course = require("./Teacher_Course");
const Message = require("./Message");
const Competence = require("./Competence");

//Institution --> Courses

Institution.hasMany(Course, {
  foreignKey: "institutionId",
});
Course.belongsTo(Institution, {
  foreignKey: "institutionId",
});

// Institution many Teachers

Institution.hasMany(Teacher, {
  foreignKey: "institutionId",
});
Teacher.belongsTo(Institution, {
  foreignKey: "institutionId",
});

//Institution many Student

Institution.hasMany(Student, {
  foreignKey: "institutionId",
});
Student.belongsTo(Institution, {
  foreignKey: "institutionId",
});

//Institution many Content
Institution.hasMany(Content, {
  foreignKey: "institutionId",
});
Content.belongsTo(Institution, {
  foreignKey: "institutionId",
});

//Institution many Parent
Institution.hasMany(Parent, {
  foreignKey: "institutionId",
});
Parent.belongsTo(Institution, {
  foreignKey: "institutionId",
});

//Institution many Role
Institution.hasMany(Role, {
  foreignKey: "institutionId",
});
Role.belongsTo(Institution, {
  foreignKey: "institutionId",
});

//Course many Student
Course.hasMany(Student, {
  foreignKey: "courseId",
});
Student.belongsTo(Course, {
  foreignKey: "courseId",
});

//Course many Homework
Course.hasMany(Homework, {
  foreignKey: "courseId",
});
Homework.belongsTo(Course, {
  foreignKey: "courseId",
});

//Course many Teacher_Course
Course.hasMany(Teacher_Course, {
  foreignKey: "courseId",
});
Teacher_Course.belongsTo(Course, {
  foreignKey: "courseId",
});

//Course many Message
Course.hasMany(Message, {
  foreignKey: "courseId",
});
Message.belongsTo(Course, {
  foreignKey: "courseId",
});

//Parent many Student
Parent.hasMany(Student, {
  foreignKey: "parentId",
});
Student.belongsTo(Parent, {
  foreignKey: "parentId",
});

//Parent many Message
Parent.hasMany(Message, {
  foreignKey: "parentId",
});
Message.belongsTo(Parent, {
  foreignKey: "parentId",
});

//Teacher many Teacher_Course
Teacher.hasMany(Teacher_Course, {
  foreignKey: "teacherId",
});
Teacher_Course.belongsTo(Teacher, {
  foreignKey: "teacherId",
});

//Teacher many Homework
Teacher.hasMany(Homework, {
  foreignKey: "teacherId",
});
Homework.belongsTo(Teacher, {
  foreignKey: "teacherId",
});

//Teacher many Message
Teacher.hasMany(Message, {
  foreignKey: "teacherId",
});
Message.belongsTo(Teacher, {
  foreignKey: "teacherId",
});

//Role many Teacher
Role.hasMany(Teacher, {
  foreignKey: "roleId",
});
Teacher.belongsTo(Role, {
  foreignKey: "roleId",
});

//Role many Student
Role.hasMany(Student, {
  foreignKey: "roleId",
});
Student.belongsTo(Role, {
  foreignKey: "roleId",
});

//Competence many Content
Competence.hasMany(Content, {
  foreignKey: "competenceId",
});
Content.belongsTo(Competence, {
  foreignKey: "competenceId",
});
