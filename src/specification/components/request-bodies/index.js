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
    description: 'Logs in a user',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/LoginObject'
        }
      }
    }
  }
};
