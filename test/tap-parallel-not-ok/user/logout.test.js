import tap from 'tap';
import { build } from '../../../src/app.js';
import 'must/register.js';
import Chance from 'chance';

const chance = new Chance();

tap.mochaGlobals();

const prefix = '/api';

describe('Logging out a user should work', async () => {
  let app;

  before(async () => {
    app = await build({
      forceCloseConnections: true
    });
  });

  const newUser = {
    username: chance.email({ domain: 'example.com' }),
    firstName: chance.first(),
    lastName: chance.last(),
    password: chance.string({ length: 10 })
  };

  let cookie = '';

  it('should return the created user object', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/user`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // all new values should be equal to properties of new blog
    result.username.must.be.equal(newUser.username);
    result.firstName.must.be.equal(newUser.firstName);
    result.lastName.must.be.equal(newUser.lastName);
    // expect dates to be not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
  it('login should work', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/user/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          username: newUser.username,
          password: newUser.password
        }
      )
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(200);

    cookie = response.headers['set-cookie'];
  });
  it('logout should work', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/user/logout`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      }
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(200);
  });
  it('logout should return error 401, no cookie', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/user/logout`,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(401);
  });
  after(async () => {
    await app.close();
  });
});
