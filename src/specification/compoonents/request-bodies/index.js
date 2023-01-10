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
  }
};
