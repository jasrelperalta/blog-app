export const parameters = {
  BlogParameterId: {
    name: 'blogId',
    in: 'path',
    required: true,
    description: 'Id of blog post',
    schema: {
      type: 'string'
    }
  }
};
