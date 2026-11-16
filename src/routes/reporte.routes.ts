import { Router } from 'express'
import { obtenerReportesGerencia } from '../controllers/reporte.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'

const router = Router()

router.get('/reports/gerencia', verifyToken, authorize('GERENCIA'), obtenerReportesGerencia)

export default router