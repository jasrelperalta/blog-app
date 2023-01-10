import { general } from './general/index.js';
import { blog } from './blog/index.js';
import { comment } from './comment/index.js';
import { user } from './user/index.js';

export const paths = {
  ...general,
  ...blog,
  ...comment,
  ...user
};
