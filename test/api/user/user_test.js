let chai = require('chai');
const expect = require('chai').expect;
let chaiHttp = require('chai-http');
let should = chai.should();
const server = '../../../server.js';

chai.use(chaiHttp);

// describe('GET /api/users/getAll', () => { 
//     it('OK, LISTING A USERS WORKS',(done) => {
//         chai.request(server).get('/api/users/getAll').end((err,res) => {
//             res.should.have.status(200);
//             // const body = response.body;
//             // console.log(body);
//             // expect(body).to.contain.property('success');
//             done();
//         });
//     })
// });
describe('Insert a country: ',()=>{
    it('OK, LISTING A USERS WORKS', (done) => {
        chai.request("http://192.168.0.21:3000")
        .get('/api/users/getAll')
        .end( function(err,res){
            console.log('res:');
            console.log(res.body);
            // console.log(err);
            expect(res).to.have.status(201);
            done();
        });
    });
});
   

describe('POST /api/users/create', () => {
    it('OK, LISTING A USERS WORKS',(done) => {
        chai.request("http://192.168.0.21:3000").post('/api/users/create').send({
            id: '10',
            email: "diegomaradona@gmail.com",
            name: "diego",
            lastname: "maradona",
            phone: "51997491844",
            password: "password",
            sessionToken: '-',
        }).end(function(err,res) {
            const body = res.body;
            console.log(body);
            expect(res).to.have.status(201);
            // expect(body).to.contain.property('success');
            // expect(body).to.contain.property('data');
            done();
        });
    })
});