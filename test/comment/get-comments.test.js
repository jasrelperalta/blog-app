import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Getting comments of a blog should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('should return the created object with uuid', async () => {
    const newBlog = {
      title: 'New Blog to get comment from test',
      desc: 'New Description to get comment from test'
    };
    const createBlog = await app.inject({
      method: 'POST',
      url: `${prefix}/blog`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    });

    const { id: blogId } = await createBlog.json();

    const newComment = {
      text: 'New Comment to get comment from test'
    };

    const createComment = await app.inject({
      method: 'POST',
      url: `${prefix}/blog/${blogId}/comment`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    });

    const newComment2 = {
      text: 'Newer Comment 2 to get comment from test'
    };

    const createComment2 = await app.inject({
      method: 'POST',
      url: `${prefix}/blog/${blogId}/comment`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment2)
    });

    const newComment3 = {
      text: 'Newer Comment 2 to get comment from test'
    };

    const createComment3 = await app.inject({
      method: 'POST',
      url: `${prefix}/blog/${blogId}/comment`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment3)
    });

    const newComment4 = {
      text: 'Newer Comment 2 to get comment from test'
    };

    const createComment4 = await app.inject({
      method: 'POST',
      url: `${prefix}/blog/${blogId}/comment`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment4)
    });

    const newComment5 = {
      text: 'Newer Comment 2 to get comment from test'
    };

    const createComment5 = await app.inject({
      method: 'POST',
      url: `${prefix}/blog/${blogId}/comment`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment5)
    });

    const newComment6 = {
      text: 'Newer Comment 2 to get comment from test'
    };

    const createComment6 = await app.inject({
      method: 'POST',
      url: `${prefix}/blog/${blogId}/comment`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment6)
    });

    await createComment.json();
    await createComment2.json();
    await createComment3.json();
    await createComment4.json();
    await createComment5.json();
    await createComment6.json();

    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/blog/${blogId}/comment`
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    result.length.must.not.be.above(5);
  });
});
