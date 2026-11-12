import { Router } from 'express'
import { obtenerReportesGerencia } from '../controllers/reporte.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'

const router = Router()

/**
 * @swagger
 * /reports/gerencia:
 *   get:
 *     summary: Obtener reportes gerenciales y estadísticas de la clínica
 *     tags: [Reportes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Reportes obtenidos exitosamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No tienes permisos de GERENCIA
 */

// Endpoint protegido para gerencia con agregaciones de Prisma
router.get('/reports/gerencia', verifyToken, authorize('GERENCIA'), obtenerReportesGerencia)

export default router