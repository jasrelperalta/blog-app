import tap from 'tap';
import { build } from '../../../src/app.js';
import 'must/register.js';
import Chance from 'chance';

const chance = new Chance();

tap.mochaGlobals();

const prefix = '/api';

describe('Getting many blogs should work', async () => {
  let app;

  const newUser = {
    username: chance.email({ domain: 'example.com' }),
    firstName: chance.first(),
    lastName: chance.last(),
    password: chance.string({ length: 10 })
  };

  let cookie = '';

  before(async () => {
    app = await build({
      forceCloseConnections: true
    });
  });

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
      url: `${prefix}/login`,
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

  it('should return the list of created objects with default limit', async () => {
    const response = await app.inject({
      method: 'GET',
      headers: {
        cookie
      },
      url: `${prefix}/blog`
    });
    // checks if status code is 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    result.length.must.not.be.above(5);
  });

  it('should return the list of created objects with given limit', async () => {
    const response = await app.inject({
      method: 'GET',
      headers: {
        cookie
      },
      url: `${prefix}/blog?limit=3`
    });
    // checks if status code is 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    result.length.must.not.be.above(3);
  });
  after(async () => {
    await app.close();
  });
});
