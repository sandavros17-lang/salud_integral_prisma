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

export async function obtenerCorteDiario(req: Request, res: Response) {
  try {
    const date = req.query.date as string

    const inicioDia = new Date(`${date}T00:00:00.000Z`)
    const finDia = new Date(`${date}T23:59:59.999Z`)

    if (isNaN(inicioDia.getTime())) {
      return res.status(400).json({ exito: false, message: 'Fecha inválida' })
    }

    const resumen = await reporteModel.getCorteDiario(inicioDia, finDia)

    return res.json({
      exito: true,
      fecha: date,
      datos: resumen
    })
  } catch (error) {
    console.error('Error al generar corte diario:', error)
    return res.status(500).json({ message: 'Error al consultar el corte diario' })
  }
}

export async function obtenerMedicosPorEspecialidad(req: Request, res: Response) {
  try {
    const datos = await reporteModel.getMedicosPorEspecialidad()

    return res.json({
      exito: true,
      datos,
    })
  } catch (error) {
    console.error('Error al generar reporte de médicos por especialidad:', error)
    return res.status(500).json({ message: 'Error al consultar médicos por especialidad' })
  }
}