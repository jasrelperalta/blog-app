import tap from 'tap';
import { build } from '../../../src/app.js';
import 'must/register.js';
import Chance from 'chance';

const chance = new Chance();

tap.mochaGlobals();

const prefix = '/api';

describe('Deleting a blog should work', async () => {
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
    const anotherResult = await response.json();
    anotherResult.username.must.be.equal(newUser.username);
    anotherResult.firstName.must.be.equal(newUser.firstName);
    anotherResult.lastName.must.be.equal(newUser.lastName);
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

  it('should return success = true if deleted', async () => {
    const newBlog = {
      title: 'New Blog to get from test',
      desc: 'New Description to get from test'
    };
    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/blog`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newBlog)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'DELETE',
      headers: {
        cookie
      },
      url: `${prefix}/blog/${id}`
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect success to be true
    result.success.must.be.true();

    const getResponse = await app.inject({
      method: 'GET',
      headers: {
        cookie
      },
      url: `${prefix}/blog/${id}`
    });

    getResponse.statusCode.must.be.equal(404);
  });

  it('should return error 403 because invalid user', async () => {
    const anotherNewBlog = {
      title: 'New Blog to get from test',
      desc: 'New Description to get from test'
    };
    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/blog`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(anotherNewBlog)
    });

    const { id } = await createResponse.json();

    console.log(cookie, cookie2);
    const response = await app.inject({
      method: 'DELETE',
      headers: {
        cookie: cookie2
      },
      url: `${prefix}/blog/${id}`
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(403);
  });
  after(async () => {
    await app.close();
  });
});
