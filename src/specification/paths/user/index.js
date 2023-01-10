export const user = {
  '/user': {
    post: {
      summary: 'Create a new user',
      operationId: 'createUser',
      requestBody: {
        $ref: '#/components/requestBodies/RequestNewUser'
      },
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulUserResponse'
        }
      },
      security: [
        {}
      ]
    }
  },
  '/user/:userId': {
    parameters: [
      {
        $ref: '#/components/parameters/UserParameterId'
      }
    ],
    get: {
      summary: 'Gets user data',
      operationId: 'getUser',
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulUserDataResponse'
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    },
    put: {
      summary: 'Edit own user data',
      operationId: 'editUser',
      requestBody: {
        $ref: '#/components/requestBodies/RequestEditUser'
      },
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulUserDataResponse'
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    }
  },
  '/login': {
    post: {
      summary: 'Logs in a user',
      operationId: 'login',
      requestBody: {
        $ref: '#/components/requestBodies/RequestLogin'
      },
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulResponse'
        }
      },
      security: [
        {}
      ]
    }
  },
  '/logout': {
    get: {
      summary: 'Logs out a user',
      operationId: 'logout',
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
  },
  '/change-password': {
    // put instead of post
    put: {
      summary: 'Changes own password of user',
      operationId: 'changePassword',
      requestBody: {
        $ref: '#/components/requestBodies/RequestChangePassword'
      },
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
