import { paths } from './paths/index.js';
import { components } from './compoonents/index.js';

export const specification = {
  openapi: '3.0.0',
  info: {
    title: 'Blog App',
    version: '1.0.0'
  },
  paths,
  components
};
