let createApiSchema = {
    id:"/movie",
    type: 'object',
    properties : {
        name: {
        type: 'string'
      },
      desc: {
        type: 'string'
      },
      actors: {
        type: 'string'
      },
      genre: {
        type: 'string',
      }
    },
    required: [
      'name',
      'desc',
      'actors',
      'genre'
    ]
}
let updateApiSchema = {
    type: 'object',
    properties : {
        name: {
        type: 'string'
      },
      desc: {
        type: 'string'
      },
      actors: {
        type: 'string'
      },
      genre: {
        type: 'string',
      }
    },
    required: [
      'name',
      'desc',
      'actors',
      'genre'
    ]
}

module.exports = {
    createApiSchema,updateApiSchema
}