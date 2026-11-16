import { Router } from 'express'
import { 
  crearCita, 
  obtenerAgendaMedico, 
  actualizarCitaParcial, 
  obtenerCitas 
} from '../controllers/cita.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'

const router = Router()

router.post('/citas', verifyToken, authorize('RECEPCIONISTA', 'GERENCIA'), crearCita)


router.get('/doctors/:id/citas', verifyToken, authorize('MEDICO', 'GERENCIA'), obtenerAgendaMedico)

router.get('/citas', verifyToken, authorize('RECEPCIONISTA', 'GERENCIA'), obtenerCitas)

router.patch('/citas/:id', verifyToken, authorize('RECEPCIONISTA', 'MEDICO', 'GERENCIA'), actualizarCitaParcial)

export default router