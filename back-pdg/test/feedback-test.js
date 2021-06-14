// const request = require("supertest");
// const app = require("../app");
// var studentId = 3

// /**
//  * Test que permite obtener los desempeños de un estudiante existente
//  * retorna codigo 200
//  */

//  describe("GET/feedbacks",function(){
//     it("respond with the feedback of a student",function(done){
//         request(app)
//             .get("/feed/"+studentId)
//             .set("Accept", "application/json")
//             .expect(200,done)
//     })
// })

// /**
//  * Test que permite crear una retroalimentación del estudiante con Id 3
//  * retorna codigo 200
//  */
// describe("POST/feedbacks",function(){
//     it("respond with the feedback created",function(done){
//         var newFeed = {title: 'FeedNew Test',message:"Well done", date:"01/06/2021",qualification:4,teacherId:20,studentId:3};
//         request(app)
//             .post("/feed/")
//             .send(newFeed)        
//             .expect(200)
//             .end(function(err, res){
//                 if(err){
//                   return done(err);
//                 }                
//                 done();                
//             });
//     })
// })