import { Router } from 'express'
import { medicoController } from '../controllers/medico.controller.ts'
import { validarMedico } from '../middlewares/validate-medico.ts'

const router = Router()

// Ruta para listar todos los medicos con su especialidad
router.get('/doctors', medicoController.listarMedicos)

// Ruta para buscar un medico por ID
router.get('/doctors/:id', medicoController.obtenerMedicoPorId)

// Ruta para crear un medico aplicando el middleware de validación de Zod
router.post('/doctors', validarMedico, medicoController.crearMedico)

export default router