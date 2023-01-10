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
          $ref: '#/components/responses/SuccessfulBlogResponse'
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    },
    get: {
      summary: 'Get many blog entries',
      operationId: 'getManyBlog',
      parameters: [
        {
          $ref: '#/components/parameters/GetBlogLimit'
        }
      ],
      responses: {
        200: {
          description: 'A blog entry',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetManyBlogResponseObject'
              }
            }
          }
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    }
  },
  '/blog/:blogId': {
    parameters: [
      {
        $ref: '#/components/parameters/BlogParameterId'
      }
    ],
    get: {
      summary: 'Get a blog entry',
      operationId: 'getBlog',
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulGetBlogResponse'
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    },
    put: {
      summary: 'Update a blog entry',
      operationId: 'updateBlog',
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
          $ref: '#/components/responses/SuccessfulBlogResponse'
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    },
    delete: {
      summary: 'Delete a blog entry',
      operationId: 'deleteBlog',
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulResponse'
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    }
  }
};
