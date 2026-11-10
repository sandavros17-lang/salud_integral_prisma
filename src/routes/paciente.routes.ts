import { Router } from 'express'
import { pacienteController } from '../controllers/paciente.controller.ts'
import { validarPaciente } from '../middlewares/validate-patient.ts'

const router = Router()

// GET /api/patients - Lista todos los pacientes
router.get('/patients', pacienteController.listarPacientes)

// GET /api/patients/:id - Un paciente por ID (404 si no existe)
router.get('/patients/:id', pacienteController.obtenerPacientePorId)

// POST /api/patients - Crea un paciente validado con Zod
router.post('/patients', validarPaciente, pacienteController.crearPaciente)

export default router