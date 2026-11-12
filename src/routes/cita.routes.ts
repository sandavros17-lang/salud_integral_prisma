import { Router } from 'express'
import { crearCita, obtenerAgendaMedico, actualizarCitaParcial} from '../controllers/cita.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'

const router = Router()

/**
 * @swagger
 * /citas:
 *   post:
 *     summary: Agendar una nueva cita médica
 *     tags: [Citas]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Cita creada exitosamente
 */

// Parte 1: Agendar cita
router.post('/citas', verifyToken, authorize('RECEPCIONISTA', 'GERENCIA'), crearCita)

/**
 * @swagger
 * /doctors/{id}/appointments:
 *   get:
 *     summary: Obtener la agenda de un médico por rango de fechas
 *     tags: [Citas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio (YYYY-MM-DD)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Agenda obtenida correctamente
 */

// Parte 2: Agenda del médico por rango de fechas
router.get('/doctors/:id/appointments', verifyToken, authorize('MEDICO', 'GERENCIA'), obtenerAgendaMedico)

/**
 * @swagger
 * /citas/{id}:
 *   patch:
 *     summary: Actualizar parcialmente una cita (estado, motivo, fecha)
 *     tags: [Citas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cita actualizada exitosamente
 */

// Parte 3: Actualización parcial de cita (PATCH)
router.patch('/citas/:id', verifyToken, authorize('RECEPCIONISTA', 'MEDICO', 'GERENCIA'), actualizarCitaParcial)
export default router