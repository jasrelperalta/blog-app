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
      }
    }
  }
};
