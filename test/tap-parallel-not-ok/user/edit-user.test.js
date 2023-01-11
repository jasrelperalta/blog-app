import tap from 'tap';
import { build } from '../../../src/app.js';
import 'must/register.js';
import Chance from 'chance';

const chance = new Chance();

tap.mochaGlobals();

const prefix = '/api';

describe('Updating comments of a blog should work', async () => {
  let app;

  const newUser = {
    username: chance.email({ domain: 'example.com' }),
    firstName: chance.first(),
    lastName: chance.last(),
    password: chance.string({ length: 10 })
  };

  let cookie = '';

  const anotherUser = {
    username: chance.email({ domain: 'example.com' }),
    firstName: chance.first(),
    lastName: chance.last(),
    password: chance.string({ length: 10 })
  };

  let cookie2 = '';

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

    // another user created
    const anotherResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/user`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(anotherUser)
    });

    // checks if status code is 200
    anotherResponse.statusCode.must.be.equal(200);
    const anotherResult = await anotherResponse.json();
    anotherResult.username.must.be.equal(anotherUser.username);
    anotherResult.firstName.must.be.equal(anotherUser.firstName);
    anotherResult.lastName.must.be.equal(anotherUser.lastName);
    // expect dates to be not null
    anotherResult.createdDate.must.not.be.null();
    anotherResult.updatedDate.must.not.be.null();
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

    // another user login
    const anotherResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          username: anotherUser.username,
          password: anotherUser.password
        }
      )
    });

    // checks if status code is 200
    anotherResponse.statusCode.must.be.equal(200);

    cookie2 = anotherResponse.headers['set-cookie'];
  });

  it('should edit user data with new username, first name, and last name', async () => {
    const newEditUser = {
      newUsername: chance.email({ domain: 'example.com' }),
      newFirstName: chance.first(),
      newLastName: chance.last()
    };

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/user/${newUser.username}`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newEditUser)
    });

    response.statusCode.must.be.equal(200);
    const result = await response.json();
    console.log(result);

    result.username.must.be.equal(newEditUser.newUsername);
    result.firstName.must.be.equal(newEditUser.newFirstName);
    result.lastName.must.be.equal(newEditUser.newLastName);
  });

  it('should not edit user data because account does not exist', async () => {
    const newEditUser = {
      username: chance.email({ domain: 'example.com' }),
      firstName: chance.first(),
      lastName: chance.last()
    };

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/user/${newEditUser.username}`,
      headers: {
        'Content-Type': 'application/json',
        cookie: cookie2
      },
      body: JSON.stringify(newEditUser)
    });

    response.statusCode.must.be.equal(403);
  });

  it('should not edit user data because of wrong path', async () => {
    const newEditUser = {
      username: chance.email({ domain: 'example.com' }),
      firstName: chance.first(),
      lastName: chance.last()
    };

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/user/${anotherUser.username}`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newEditUser)
    });

    // should return unauthorized because it's not their account
    response.statusCode.must.be.equal(401);
  });

  after(async () => {
    await app.close();
  });
});
