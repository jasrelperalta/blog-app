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
import { login } from './user/login.js';
import { logout } from './user/logout.js';
import { getUser } from './user/get-user.js';
import { changePassword } from './user/change-password.js';
import { editUser } from './user/edit-user.js';

export class Service {
  constructor (app) {
    this.app = app;
  }

  general = general
  createUser = createUser
  login = login
  logout = logout
  getUser = getUser
  changePassword = changePassword
  editUser = editUser
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
}
