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
  after(async () => {
    await app.close();
  });
});
