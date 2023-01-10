import { general } from './general/index.js';
import { createBlog } from './blogs/create-blog.js';
import { deleteBlog } from './blogs/delete-blog.js';
import { getBlog } from './blogs/get-blog.js';
import { getManyBlog } from './blogs/get-many-blog.js';
import { updateBlog } from './blogs/update-blog.js';
import { createComment } from './comments/create-comment.js';
import { getManyComment } from './comments/get-many-comment.js';
import { updateComment } from './comments/update-comment.js';
import { getComment } from './comments/get-comment.js';
import { deleteComment } from './comments/delete-comment.js';
import { createUser } from './user/create-user.js';

export class Service {
  constructor (app) {
    this.app = app;
  }

  general = general
  createBlog = createBlog
  deleteBlog = deleteBlog
  getBlog = getBlog
  getManyBlog = getManyBlog
  updateBlog = updateBlog
  createComment = createComment
  deleteComment = deleteComment
  getComment = getComment
  getManyComment = getManyComment
  updateComment = updateComment
  createUser = createUser
}
