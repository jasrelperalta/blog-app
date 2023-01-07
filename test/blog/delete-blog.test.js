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
      title: 'New Blog to get from test',
      desc: 'New Description to get from test'
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
      method: 'DELETE',
      url: `${prefix}/blog/${id}`
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect success to be true
    result.success.must.be.true();

    const getResponse = await app.inject({
      method: 'GET',
      url: `${prefix}/blog/${id}`
    });

    getResponse.statusCode.must.be.equal(404);
  });
});
