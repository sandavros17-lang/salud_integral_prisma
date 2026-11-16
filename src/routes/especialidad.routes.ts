import { Router } from 'express'
import { 
  obtenerEspecialidades, 
  crearEspecialidad, 
} from '../controllers/especialidad.controller'
// Si tus rutas de médicos/auth usan middleware de autenticación, puedes importarlo aquí:
// import { verificarToken } from '../middlewares/auth.middleware'

const router = Router()

// GET /api/especialidades - Listar todas las especialidades
router.get('/', obtenerEspecialidades)

// POST /api/especialidades - Crear una nueva especialidad
router.post('/', crearEspecialidad)

export default router