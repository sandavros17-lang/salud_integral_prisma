//Aqui las importaciones
import express from 'express'
import pacienteRutas from './routes/paciente.routes.ts'
import medicoRutas from './routes/medico.routes.ts'
import authRutas from './routes/auth.routes.js'
import citaRutas from './routes/cita.routes.js'
import reporteRutas from './routes/reporte.routes.js'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'

const app = express()
app.use(express.json())

// aqui las rutas
app.use('/api', pacienteRutas)
app.use('/api', medicoRutas)
app.use('/api/auth', authRutas)
app.use('/api', citaRutas)
app.use('/api', reporteRutas)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

console.log('>>> Intentando arrancar el servidor...')

// ... (aquí va tu app.listen)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`)
})