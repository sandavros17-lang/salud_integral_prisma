//Aqui las importaciones
import express from 'express'
import pacienteRutas from './routes/paciente.routes.ts'
import medicoRutas from './routes/medico.routes.ts'

const app = express()
app.use(express.json())

// aqui las rutas
app.use('/api', pacienteRutas)
app.use('/api', medicoRutas)

// ... (aquí va tu app.listen)