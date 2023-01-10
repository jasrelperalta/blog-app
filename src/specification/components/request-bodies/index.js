export const requestBodies = {
  RequestNewUser: {
    description: 'Request body for creating a new user',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/UserRequestObject'
        }
      }
    }
  },
  RequestLogin: {
    description: 'Request body for logging in a user',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/LoginObject'
        }
      }
    }
  },
  RequestChangePassword: {
    description: 'The request body of changing own password of user',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ChangePasswordObject'
        }
      }
    }
  }
};
