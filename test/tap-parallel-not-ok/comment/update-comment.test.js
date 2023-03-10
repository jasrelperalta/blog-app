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

  it('should return the updated object with uuid', async () => {
    const newBlog = {
      title: 'New Blog to get comment from test',
      desc: 'New Description to get comment from test'
    };
    const createBlog = await app.inject({
      method: 'POST',
      url: `${prefix}/blog`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newBlog)
    });

    const { id: blogId } = await createBlog.json();

    const newComment = {
      text: 'New Comment to update comment from test'
    };

    const createComment = await app.inject({
      method: 'POST',
      url: `${prefix}/blog/${blogId}/comment`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newComment)
    });

    const { commentId, createdDate, updatedDate } = await createComment.json();

    const newerComment = {
      text: 'Updated comment from test'
    };

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/blog/${blogId}/comment/${commentId}`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newerComment)
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect id to be equal to result
    result.commentId.must.be.equal(commentId);
    // new values must be equal to new comment
    result.text.must.be.equal(newerComment.text);
    // expect updateddate to be updated and createddate to be same
    result.createdDate.must.be.equal(createdDate);
    result.updatedDate.must.be.above(updatedDate);
  });

  it('should error 403 because invalid user', async () => {
    const newBlog = {
      title: 'New Blog to get comment from test',
      desc: 'New Description to get comment from test'
    };
    const createBlog = await app.inject({
      method: 'POST',
      url: `${prefix}/blog`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newBlog)
    });

    const { id: blogId } = await createBlog.json();

    const newComment = {
      text: 'New Comment to update comment from test'
    };

    const createComment = await app.inject({
      method: 'POST',
      url: `${prefix}/blog/${blogId}/comment`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newComment)
    });

    const { commentId } = await createComment.json();

    const newerComment = {
      text: 'Updated comment from test'
    };

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/blog/${blogId}/comment/${commentId}`,
      headers: {
        'Content-Type': 'application/json',
        cookie: cookie2
      },
      body: JSON.stringify(newerComment)
    });

    // checks if status code is 403
    response.statusCode.must.be.equal(403);
  });
  after(async () => {
    await app.close();
  });
});
