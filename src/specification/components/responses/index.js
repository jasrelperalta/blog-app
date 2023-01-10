export const responses = {
  SuccessfulUserResponse: {
    description: 'Successful response to return a user object',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/UserObject'
        }
      }
    }
  },
  SuccessfulBlogResponse: {
    description: 'A blog entry',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/BlogObject'
        }
      }
    }
  },
  SuccessfulGetBlogResponse: {
    description: 'A blog entry',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/GetBlogResponseObject'
        }
      }
    }
  },
  SuccessfulCommentResponse: {
    description: 'A comment object',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/CommentObject'
        }
      }
    }
  },
  SuccessfulResponse: {
    description: 'Successful response',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SuccessfulObject'
        }
      }
    }
  }
};
