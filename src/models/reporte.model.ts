import { prisma } from '../config/prisma.js'

export const reporteModel = {
  // Reporte 1 Agrupar citas por estado y contar cuántas hay en cada una
  async getCitasPorEstado() {
    return await prisma.cita.groupBy({
      by: ['estado'],
      _count: {
        id: true,
      },
    })
  },

  // Reporte 2 Obtener la suma total de los ingresos de las facturas
  async getIngresosTotales() {
    return await prisma.factura.aggregate({
      _sum: {
        valorTotal: true,
      },
    })
  },

  // Reporte 3: Corte diario de citas completadas y canceladas
  async getCorteDiario(inicioDia: Date, finDia: Date) {
    const [completadas, canceladas] = await Promise.all([
      prisma.cita.count({
        where: {
          fechaHora: { gte: inicioDia, lte: finDia },
          estado: 'COMPLETADA',
        },
      }),
      prisma.cita.count({
        where: {
          fechaHora: { gte: inicioDia, lte: finDia },
          estado: 'CANCELADA',
        },
      }),
    ])

    return { completadas, canceladas }
  },

// Reporte 4: Cantidad de médicos por especialidad
  async getMedicosPorEspecialidad() {
    const especialidades = await prisma.especialidad.findMany({
      select: {
        id: true,
        nombre: true,
        _count: {
          select: {
            medicos: true,
          },
        },
      },
    })

    return especialidades.map((esp) => ({
      id: esp.id,
      especialidad: esp.nombre,
      totalMedicos: esp._count.medicos,
    }))
  },
}