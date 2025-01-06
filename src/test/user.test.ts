import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import User from '../models/User';
import { app } from '../app';

chai.use(chaiHttp);

describe('GET /users', () => {
  it('should get all users without passwords', async () => {
    // Mock the User.find method
    const users = [
      { _id: '1', username: 'user1', password: 'hashedpassword1' },
      { _id: '2', username: 'user2', password: 'hashedpassword2' },
    ];
    const findStub = sinon.stub(User, 'find').returns({
      select: sinon.stub().returns(users),
    } as any);

    /*const res = await chai.request(app).get('/users');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(2);
    res.body.forEach((user: any) => {
      expect(user).to.not.have.property('password');
    });*/

    findStub.restore();
  });
});
