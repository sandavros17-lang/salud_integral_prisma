import { prisma } from '../config/prisma.js'

export const reporteModel = {
  // Reporte 1: Agrupar citas por estado y contar cuántas hay en cada una
  async getCitasPorEstado() {
    return await prisma.cita.groupBy({
      by: ['estado'],
      _count: {
        id: true,
      },
    })
  },

  // Reporte 2: Obtener la suma total de los ingresos de las facturas
  async getIngresosTotales() {
    return await prisma.factura.aggregate({
      _sum: {
        valorTotal: true,
      },
    })
  }
}