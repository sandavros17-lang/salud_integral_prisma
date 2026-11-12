import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Clínica Salud Integral',
      version: '1.0.0',
      description: 'Documentación oficial del sistema de gestión médica, citas y reportes gerenciales',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de Desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Lee automáticamente las anotaciones JSDoc en tus rutas
}

export const swaggerSpec = swaggerJsdoc(options)