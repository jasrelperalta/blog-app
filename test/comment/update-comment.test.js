import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Updating comments of a blog should work', async () => {
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

    const { commentId, createdDate, updatedDate } = await createComment.json();

    const newerComment = {
      text: 'Updated comment from test'
    };

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/blog/${blogId}/comment/${commentId}`,
      headers: {
        'Content-Type': 'application/json'
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
});
