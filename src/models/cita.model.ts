import { prisma } from '../config/prisma.js'

export const citaModel = {
  // Función 1: Crear cita
  async createCita(data: { pacienteId: number; medicoId: number; fechaHora: Date; motivo?: string }) {
    return await prisma.cita.create({
      data: {
        pacienteId: data.pacienteId,
        medicoId: data.medicoId,
        fechaHora: data.fechaHora,
        motivo: data.motivo || 'Consulta general',
      },
      include: {
        paciente: true,
        medico: {
          include: { especialidad: true }
        }
      }
    })
  },

  // Función 2: Agenda del médico
  async getDoctorAgenda(medicoId: number, from?: Date, to?: Date) {
    return await prisma.cita.findMany({
      where: {
        medicoId,
        ...(from && to ? { fechaHora: { gte: from, lte: to } } : {}),
      },
      include: {
        paciente: true,
      },
      orderBy: { fechaHora: 'asc' },
    })
  },

  // Función 3: Actualización parcial
  async updateCita(id: number, data: Partial<{ fechaHora: Date; motivo: string; estado: string }>) {
    return await prisma.cita.update({
      where: { id },
      data,
      include: {
        paciente: true,
        medico: {
          include: { especialidad: true }
        }
      }
    })
  }
}