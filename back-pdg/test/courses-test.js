// const request = require("supertest");
// const app = require("../app");
// var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Imluc3RpdHV0aW9uIiwibmFtZSI6IlBpdHVmb3MiLCJpYXQiOjE2MjI1NTkyNzUsImV4cCI6MTYyMjY0NTY3NX0.K4Siwjmy5ke7kphYWPYFQKJGvUtxT6bC6M_1NL4ODuk"
// var courseId=0

// /**
//  * Test que permite obtener los cursos de una institución existente
//  * retorna codigo 200
//  */

// describe("GET/courses",function(){
//     it("respond with the courses of a school",function(done){
//         request(app)
//             .get("/course/")
//             .set({'x-access-token': token})
//             .set("Accept", "application/json")
//             .expect(200,done)
//     })
// })
// /**
//  * Test para crear un curso de una institución existente
//  * retorna codigo 200
//  */
// describe("POST/courses",function(){
//     it("respond with the course created",function(done){
//         var newCourse = {name: 'CursoNew Test',institutionId:1, teacherId: 20};
//         request(app)
//             .post("/course/")
//             .send(newCourse) 
//             .set({'x-access-token': token})          
//             .expect(200)
//             .end(function(err, res){
//                 if(err){
//                   return done(err);
//                 }
                
//                 courseId = res.body.course.id;
                
//                 done();                
//             });
//     })
// })
// /**
//  * Edita el curso previamente creado de la institución
//  * Retorna codigo 200
//  */

// describe("PUT/courses",function(){
//     it("respond with the courses edited",function(done){
//         var courseEdit = {name: 'CursoEdit Test', teacherId: 20};
//         request(app)
//             .put("/course/"+courseId)
//             .send(courseEdit)
//             .set({'x-access-token': token})
//             .set("Accept", "application/json")
//             .expect(200,done)
//     })
// })

// /**
//  * Test para eliminar el curso creado previamente de la institución
//  * retorna codigo 200
//  */
// describe("DELETE/courses",function(){
//     it("respond with the OK",function(done){
//         request(app)
//             .delete("/course/"+courseId)
//             .set({'x-access-token': token})
//             .set("Accept", "application/json")
//             .expect(200,done)
//     })
// })








