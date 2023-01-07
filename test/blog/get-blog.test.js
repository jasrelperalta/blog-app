import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Getting a blog should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('should return the created object with uuid', async () => {
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
      method: 'GET',
      url: `${prefix}/blog/${id}`
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect id should exist
    result.id.must.equal(id);
    // all new values should be equal to properties of new blog
    result.title.must.be.equal(newBlog.title);
    result.desc.must.be.equal(newBlog.desc);
    // expect dates to be not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
});
