import { Router } from 'express'
import { crearCita, obtenerAgendaMedico, actualizarCitaParcial } from '../controllers/cita.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'

const router = Router()

router.post('/citas', verifyToken, authorize('RECEPCIONISTA', 'GERENCIA'), crearCita)


router.get('/doctors/:id/appointments', verifyToken, authorize('MEDICO', 'GERENCIA'), obtenerAgendaMedico)


router.patch('/citas/:id', verifyToken, authorize('RECEPCIONISTA', 'MEDICO', 'GERENCIA'), actualizarCitaParcial)

export default router