import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Updateing a blog should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('should update the title and desc with uuid', async () => {
    const newBlog = {
      title: 'New Blog to get from test',
      desc: 'New Description to get from test'
    };

    const newerBlog = {
      title: 'Newer Blog updated from test',
      desc: 'Newer Description updated from test'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/blog`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/blog/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerBlog)
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect id should exist
    result.id.must.equal(id);
    // all new values should be equal to properties of new blog
    result.title.must.be.equal(newerBlog.title);
    result.desc.must.be.equal(newerBlog.desc);
    // expect dates to be not null
    result.createdDate.must.be.equal(createdDate);
    result.updatedDate.must.be.above(updatedDate);
  });

  it('should update the title with uuid', async () => {
    const newBlog = {
      title: 'New Blog to get from test',
      desc: 'New Description to get from test'
    };

    const newerBlog = {
      title: 'Newer Blog updated from test'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/blog`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/blog/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerBlog)
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect id should exist
    result.id.must.equal(id);
    // all new values should be equal to properties of new blog
    result.title.must.be.equal(newerBlog.title);
    result.desc.must.be.equal(newBlog.desc);
    // expect dates to be not null
    result.createdDate.must.be.equal(createdDate);
    result.updatedDate.must.be.above(updatedDate);
  });

  it('should update the desc with uuid', async () => {
    const newBlog = {
      title: 'New Blog to get from test',
      desc: 'New Description to get from test'
    };

    const newerBlog = {
      desc: 'Newer Description updated from test'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/blog`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/blog/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerBlog)
    });

    // checks if status code is 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect id should exist
    result.id.must.equal(id);
    // all new values should be equal to properties of new blog
    result.title.must.be.equal(newBlog.title);
    result.desc.must.be.equal(newerBlog.desc);
    // expect dates to be not null
    result.createdDate.must.be.equal(createdDate);
    result.updatedDate.must.be.above(updatedDate);
  });
});
