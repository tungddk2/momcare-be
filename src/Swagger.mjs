import swaggerJsDoc from 'swagger-jsdoc'

const options = {
  failOnErrors: true,
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Momcare API',
      version: '1.0.0',
      description: 'Momcare',
    },
    servers: [
      {
        url: 'http://localhost:3333/api/v1',
        description: 'Local development server'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/Routes/*.mjs']
}

const specs = swaggerJsDoc(options)
export default specs
