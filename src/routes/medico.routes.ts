import { Router } from 'express'
import { medicoController } from '../controllers/medico.controller.ts'
import { validarMedico } from '../middlewares/validate-medico.ts'

const router = Router()

// Ruta para listar todos los medicos con su especialidad
router.get('/medicos', medicoController.listarMedicos)

// Ruta para buscar un medico por ID
router.get('/medicos/:id', medicoController.obtenerMedicoPorId)

// Ruta para crear un medico aplicando el middleware de validación de Zod
router.post('/medicos', validarMedico, medicoController.crearMedico)

export default router