import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ruta absoluta hacia el archivo JSON con la documentación centralizada
const swaggerPath = path.join(__dirname, 'swagger-output.json')

// Exportamos directamente el objeto JSON parseado para que Swagger UI lo lea sin usar JSDoc
export const swaggerSpec = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'))