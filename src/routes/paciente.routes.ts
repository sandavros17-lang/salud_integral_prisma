import { Router } from 'express'
import { pacienteController } from '../controllers/paciente.controller.ts'
import { validarPaciente } from '../middlewares/validate-patient.ts'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'

const router = Router()

// GET /api/patients - Lista todos los pacientes
router.get('/pacientes', pacienteController.listarPacientes)

// GET /api/patients/:id - Un paciente por ID (404 si no existe)
router.get('/pacientes/:id', pacienteController.obtenerPacientePorId)
router.get('/pacientes/:id', verifyToken, authorize('RECEPCIONISTA'), pacienteController.obtenerPacientePorId)

// POST /api/patients - Crea un paciente validado con Zod
router.post('/pacientes', validarPaciente, pacienteController.crearPaciente)

export default router