import tap from 'tap';
import { build } from '../../../src/app.js';
import 'must/register.js';
import Chance from 'chance';

const chance = new Chance();

tap.mochaGlobals();

const prefix = '/api';

describe('Changing own password of user should work', async () => {
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

  const anotherUser = {
    username: chance.email({ domain: 'example.com' }),
    firstName: chance.first(),
    lastName: chance.last(),
    password: chance.string({ length: 10 })
  };

  let cookie2 = '';

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
    const anotheResult = await anotherResponse.json();

    // all new values should be equal to properties of new blog
    anotheResult.username.must.be.equal(anotherUser.username);
    anotheResult.firstName.must.be.equal(anotherUser.firstName);
    anotheResult.lastName.must.be.equal(anotherUser.lastName);
    // expect dates to be not null
    anotheResult.createdDate.must.not.be.null();
    anotheResult.updatedDate.must.not.be.null();
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

    // another user log in
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

  it('change own password should work', async () => {
    const newChangePassword = {
      username: newUser.username,
      oldPassword: newUser.password,
      newPassword: chance.string({ length: 10 })
    };
    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/change-password`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newChangePassword)
    });

    response.statusCode.must.be.equal(200);
  });

  it('change own password should not work because of wrong old password', async () => {
    const newChangePassword = {
      username: newUser.username,
      oldPassword: chance.string({ length: 10 }),
      newPassword: chance.string({ length: 10 })
    };
    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/change-password`,
      headers: {
        'Content-Type': 'application/json',
        cookie: cookie2
      },
      body: JSON.stringify(newChangePassword)
    });

    response.statusCode.must.be.equal(401);
  });

  it('change own password should not work because of wrong input username', async () => {
    const newChangePassword = {
      username: chance.string({ length: 10 }),
      oldPassword: chance.string({ length: 10 }),
      newPassword: chance.string({ length: 10 })
    };
    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/change-password`,
      headers: {
        'Content-Type': 'application/json',
        cookie: cookie2
      },
      body: JSON.stringify(newChangePassword)
    });

    response.statusCode.must.be.equal(401);
  });
  after(async () => {
    await app.close();
  });
});
