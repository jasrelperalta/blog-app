import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Deleting a blog should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('should return success = true if deleted', async () => {
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
      text: 'New Comment to update comment from test'
    };

    const createComment = await app.inject({
      method: 'POST',
      url: `${prefix}/blog/${blogId}/comment`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    });

    const { commentId } = await createComment.json();

    const response = await app.inject({
      method: 'DELETE',
      url: `${prefix}/blog/${blogId}/comment/${commentId}`
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect success to be true
    result.success.must.be.true();

    const getResponse = await app.inject({
      method: 'GET',
      url: `${prefix}/blog/${blogId}/comment/${commentId}`
    });

    // comment should now be not found
    getResponse.statusCode.must.be.equal(404);
  });
});
