import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import {
  obtenerReportesGerencia,
  obtenerCorteDiario,
  obtenerMedicosPorEspecialidad,
} from '../controllers/reporte.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { authorize } from '../middlewares/authorize.middleware.js'

const router = Router()

const dateQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'El formato debe ser YYYY-MM-DD')
})

const validarFechaCorte = (req: Request, res: Response, next: NextFunction) => {
  const resultado = dateQuerySchema.safeParse(req.query)
  if (!resultado.success) {
    return res.status(400).json({
      exito: false,
      message: 'Parámetro date inválido o faltante (use YYYY-MM-DD)',
      errores: resultado.error.flatten().fieldErrors
    })
  }
  next()
}

router.get('/reports/gerencia', verifyToken, authorize('GERENCIA'), obtenerReportesGerencia)

router.get(
  '/reports/daily-cutoff',
  verifyToken,
  authorize('GERENCIA'),
  validarFechaCorte,
  obtenerCorteDiario
)

router.get(
  '/reports/especialidades',
  verifyToken,
  authorize('GERENCIA'),
  obtenerMedicosPorEspecialidad
)
export default router