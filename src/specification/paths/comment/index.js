export const comment = {
  '/blog/:blogId/comment': {
    parameters: [
      {
        $ref: '#/components/parameters/BlogParameterId'
      }
    ],
    post: {
      summary: 'Create a comment',
      operationId: 'createComment',
      parameters: [
        {
          $ref: '#/components/parameters/BlogParameterId'
        }
      ],
      requestBody: {
        description: 'The request body for the comment',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CommentRequestRequiredObject'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulCommentResponse'
        }
      }
    },
    get: {
      summary: 'Get many comments of a blog',
      operationId: 'getManyComment',
      parameters: [
        {
          $ref: '#/components/parameters/BlogParameterId'
        }
      ],
      responses: {
        200: {
          description: 'A list of comments of a blog',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetManyCommentResponseObject'
              }
            }
          }
        }
      }
    }
  },
  '/blog/:blogId/comment/:commentId': {
    parameters: [
      {
        $ref: '#/components/parameters/BlogParameterId'
      },
      {
        $ref: '#/components/parameters/CommentParameterId'
      }
    ],
    get: {
      summary: 'Get a comment of a blog',
      operationId: 'getComment',
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulCommentResponse'
        }
      }
    },
    put: {
      summary: 'Update a comment of a blog',
      operationId: 'updateComment',
      requestBody: {
        description: 'The request body for the comment',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CommentRequestRequiredObject'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulCommentResponse'
        }
      }
    },
    delete: {
      summary: 'Delete a comment of a blog',
      operationId: 'deleteComment',
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulResponse'
        }
      }
    }
  }
};
