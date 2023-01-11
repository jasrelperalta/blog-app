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
      summary: 'Get user data',
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
          $ref: '#/components/responses/SuccessfulEditUserDataResponse'
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
      summary: 'Log in a user',
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
      summary: 'Log out a user',
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
      summary: 'Change own password of user',
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
