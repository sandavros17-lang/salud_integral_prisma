import { Router } from 'express'
import { crearCita, obtenerAgendaMedico, actualizarCitaParcial} from '../controllers/cita.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'

const router = Router()


// Parte 1: Agendar cita
router.post('/citas', verifyToken, authorize('RECEPCIONISTA', 'GERENCIA'), crearCita)

// Parte 2: Agenda del médico por rango de fechas
router.get('/doctors/:id/appointments', verifyToken, authorize('MEDICO', 'GERENCIA'), obtenerAgendaMedico)

// Parte 3: Actualización parcial de cita (PATCH)
router.patch('/citas/:id', verifyToken, authorize('RECEPCIONISTA', 'MEDICO', 'GERENCIA'), actualizarCitaParcial)
export default router