const request = require("supertest");
const app = require("../app");
// var token = ""

/**
 * Test que permite a un usuario tipo acudiente acceder con sus credenciales
 * retorna codigo 200
 */
describe("POST/login",function(){
    it("respond with the information of the login parent",function(done){
        var login = {is:'parent',email:"carlos@gmail.com", password:"passwd"};
        request(app)
            .post("/auth/api/auth/signin")
            .send(login)        
            .expect(200)
            .end(function(err, res){
                if(err){
                  return done(err);
                }                            
                done();                
            });
    })
})

/**
 * Test que permite a un usuario tipo institución acceder con sus credenciales
 * retorna codigo 200
 */
 describe("POST/login",function(){
    it("respond with the information of the login institution",function(done){
        var login = {is:'institution',email:"pitufos@gmail.com", password:"passwd"};
        request(app)
            .post("/auth/api/auth/signin")
            .send(login)        
            .expect(200)
            .end(function(err, res){
                if(err){
                  return done(err);
                }                            
                done();                
            });
    })
})

/**
 * Test que permite a un usuario tipo profesor acceder con sus credenciales
 * retorna codigo 200
 */
 describe("POST/login",function(){
    it("respond with the information of the login teacher",function(done){
        var login = {is:'teacher',email:"pedroprofe@gmail.com", password:"passwd"};
        request(app)
            .post("/auth/api/auth/signin")
            .send(login)        
            .expect(200)
            .end(function(err, res){
                if(err){
                  return done(err);
                }                            
                done();                
            });
    })
})

/**
 * Test que permite a un usuario tipo institutición no acceder con credenciales invilidas
 * retorna codigo 404
 */
 describe("POST/wrong-login",function(){
    it("respond with the information of the login teacher",function(done){
        var login = {is:'teacher',email:"pitufos@gmail.com", password:"passwd1"};
        request(app)
            .post("/auth/api/auth/signin")
            .send(login)        
            .expect(404)
            .end(function(err, res){
                if(err){
                  return done(err);
                }                            
                done();                
            });
    })
})

/**
 * Test que permite crear un usuario de tipo teacher
 * retorna codigo 200
 */
 describe("POST/signup",function(){
    it("respond with the information of the login teacher",function(done){
        var login = {is:'teacher',email:"test@gmail.com", password:"passwd",name:"test",lastname:"lastname",idDocument:"123",phone:"123456",institutionId:1,roleId:1};
        request(app)
            .post("/auth/api/auth/signup")
            .send(login)        
            .expect(200)
            .end(function(err, res){
                if(err){
                  return done(err);
                }                            
                done();                
            });
    })
})

