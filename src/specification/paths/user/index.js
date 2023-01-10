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
    get: {
      summary: 'Gets user data',
      operationId: 'getUser',
      parameters: [
        {
          $ref: '#/components/parameters/UserParameterId'
        }
      ],
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
  }
};
