import { Request, Response } from 'express'
import { reporteModel } from '../models/reporte.model.js'

export async function obtenerReportesGerencia(req: Request, res: Response) {
  try {
    const citasPorEstado = await reporteModel.getCitasPorEstado()
    const ingresosTotales = await reporteModel.getIngresosTotales()

    return res.json({
      exito: true,
      datos: {
        citasPorEstado,
        ingresosTotales: ingresosTotales._sum.valorTotal || 0,
      }
    })
  } catch (error) {
    console.error('Error al generar reportes de gerencia:', error)
    return res.status(500).json({ message: 'Error al consultar los reportes' })
  }
}