export const parameters = {
  BlogParameterId: {
    name: 'blogId',
    in: 'path',
    required: true,
    description: 'Id of blog post',
    schema: {
      type: 'string'
    }
  },
  CommentParameterId: {
    name: 'commentId',
    in: 'path',
    required: true,
    description: 'Id of comment on a blog post',
    schema: {
      type: 'string'
    }
  },
  UserParameterId: {
    name: 'userId',
    in: 'path',
    required: true,
    description: 'Id of user',
    schema: {
      type: 'string'
    }
  },
  GetBlogLimit: {
    name: 'limit',
    in: 'query',
    description: 'Number of items to be returned',
    schema: {
      type: 'number',
      default: 5
    }
  }
};
