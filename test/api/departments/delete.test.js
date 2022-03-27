const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Department = require('../../../models/department.model');


chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/department/:id', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();
  
    const testDepTwo = new Department({ _id: '5d9f1159f81ce8d1ef2bee48', name: 'Department #2' });
    await testDepTwo.save();
  });

  after(async () => {
    await Department.deleteMany();
  });

  it('/:id should delete chosen element', async () => {
    const res = await request(server).delete('/api/departments/5d9f1159f81ce8d1ef2bee48');
    const delRes = await Department.findOne({_id: '5d9f1159f81ce8d1ef2bee48'});
    expect(res.status).to.be.equal(200);
    expect(delRes).to.be.null;
  })
});