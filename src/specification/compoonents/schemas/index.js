export const schemas = {
  BlogObject: {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      title: {
        type: 'string'
      },
      desc: {
        type: 'string'
      },
      comments: {
        $ref: '#/components/schemas/CommentObject'
      },
      createdDate: {
        type: 'number'
      },
      updatedDate: {
        type: 'number'
      }
    }
  },
  CommentObject: {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      text: {
        type: 'string'
      },
      createdDate: {
        type: 'number'
      },
      updatedDate: {
        type: 'number'
      }
    }
  },
  GetManyBlogReplyObject: {
    type: 'array',
    items: {
      properties: {
        id: {
          type: 'string'
        },
        title: {
          type: 'string'
        },
        desc: {
          type: 'string'
        },
        createdDate: {
          type: 'number'
        },
        updatedDate: {
          type: 'number'
        }
      }
    }
  },
  BlogRequestRequiredObject: {
    type: 'object',
    required: [
      'title',
      'desc'
    ],
    properties: {
      title: {
        type: 'string'
      },
      desc: {
        type: 'string'
      },
      createdDate: {
        type: 'number'
      },
      updatedDate: {
        type: 'number'
      }
    }
  },
  BlogRequestObject: {
    type: 'object',
    properties: {
      title: {
        type: 'string'
      },
      desc: {
        type: 'string'
      },
      createdDate: {
        type: 'number'
      },
      updatedDate: {
        type: 'number'
      }
    }
  },
  CommentRequestRequiredObject: {
    type: 'object',
    required: [
      'text'
    ],
    properties: {
      text: {
        type: 'string'
      },
      createdDate: {
        type: 'number'
      },
      updatedDate: {
        type: 'number'
      }
    }
  }
};
