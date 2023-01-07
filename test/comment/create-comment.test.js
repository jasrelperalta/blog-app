import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Creating a comment should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('should return the created comment with uuid', async () => {
    const newBlog = {
      title: 'New Blog from test',
      desc: 'New Description from test'
    };

    const newComment = {
      text: 'New Comment from test'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/blog`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/blog/${id}/comment`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect id should exist
    result.commentId.must.not.be.null();
    // all new values should be equal to properties of new blog
    result.text.must.be.equal(newComment.text);
    // expect dates to be not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
});
