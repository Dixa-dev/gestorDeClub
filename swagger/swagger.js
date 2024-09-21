
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

// Configuración para obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gestor API',
      version: '1.0.0',
      description: 'Api gestión de Club',
      contact: {
        name: 'DIXA',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
      {
        url: 'https://gestor-de-club.vercel.app',
        description: 'Producción server',
      },
    ],
  },
  apis: [join(__dirname, '../swagger/swagger.yml')],
};

const specs = swaggerJSDoc(options);


export default specs;