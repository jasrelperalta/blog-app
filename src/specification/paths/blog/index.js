export const blog = {
  '/blog': {
    post: {
      summary: 'Create a blog entry',
      operationId: 'createBlog',
      requestBody: {
        description: 'The request body for the blog',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BlogRequestRequiredObject'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'A blog entry',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BlogObject'
              }
            }
          }
        }
      }
    },
    get: {
      summary: 'Get many blog entries',
      operationId: 'getManyBlog',
      parameters: [
        {
          name: 'limit',
          in: 'query',
          description: 'Number of items to be returned',
          schema: {
            type: 'number'
          }
        }
      ],
      responses: {
        200: {
          description: 'A blog entry',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetManyBlogReplyObject'
              }
            }
          }
        }

      }
    }
  },
  '/blog/:blogId': {
    get: {
      summary: 'Get a blog entry',
      operationId: 'getBlog',
      parameters: [
        {
          $ref: '#/components/parameters/BlogParameterId'
        }
      ],
      responses: {
        200: {
          description: 'A blog entry',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BlogObject'
              }
            }
          }
        }
      }
    },
    put: {
      summary: 'Update a blog entry',
      operationId: 'updateBlog',
      parameters: [
        {
          $ref: '#/components/parameters/BlogParameterId'
        }
      ],
      requestBody: {
        description: 'The request body for the blog',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BlogRequestObject'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'A blog entry',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BlogObject'
              }
            }
          }
        }
      }
    },
    delete: {
      summary: 'Delete a blog entry',
      operationId: 'deleteBlog',
      parameters: [
        {
          $ref: '#/components/parameters/BlogParameterId'
        }
      ],
      responses: {
        200: {
          description: 'successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
