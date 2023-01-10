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
      commentId: {
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
  GetBlogResponseObject: {
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
      createdDate: {
        type: 'number'
      },
      updatedDate: {
        type: 'number'
      }
    }
  },
  GetManyBlogResponseObject: {
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
  GetManyCommentResponseObject: {
    type: 'array',
    items: {
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
  },
  UserObject: {
    type: 'object',
    properties: {
      username: {
        type: 'string'
      },
      firstName: {
        type: 'string'
      },
      lastName: {
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
  UserRequestObject: {
    type: 'object',
    required: [
      'username',
      'password',
      'firstName',
      'lastName'
    ],
    properties: {
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      },
      firstName: {
        type: 'string'
      },
      lastName: {
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
  EditUserRequestObject: {
    type: 'object',
    properties: {
      newUsername: {
        type: 'string'
      },
      newFirstName: {
        type: 'string'
      },
      newLastName: {
        type: 'string'
      }
    }
  },
  ChangePasswordObject: {
    type: 'object',
    required: [
      'username',
      'oldPassword',
      'newPassword'
    ],
    properties: {
      username: {
        type: 'string'
      },
      oldPassword: {
        type: 'string'
      },
      newPassword: {
        type: 'string'
      }
    }
  },
  LoginObject: {
    type: 'object',
    properties: {
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    }
  },
  SuccessfulObject: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean'
      }
    }
  }
};
