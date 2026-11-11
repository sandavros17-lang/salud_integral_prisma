import { prisma } from "../config/prisma.js"

export const medicoModel = {
  
  // Obtiene todos los médicos y opcionalmente filtra por nombre de especialidad
  async getAllDoctors(nombreEspecialidad?: string) {
    return await prisma.medico.findMany({
      where: nombreEspecialidad ? {
        especialidad: {
          nombre: {
            contains: nombreEspecialidad,
            mode: 'insensitive'
          }
        }
      } : undefined,
      include: { especialidad: true },
      orderBy: { id: 'desc' }
    })
  },

  async getDoctorById(id: number) {
    return await prisma.medico.findUnique({
      where: { id },
      include: { especialidad: true }
    })
  },

  async createDoctor(data: any) {
    return await prisma.medico.create({
      data,
      include: { especialidad: true }
    })
  },

  async buscarPorCorreo(correo: string) {
    return await prisma.medico.findUnique({ where: { correo } })
  },

  async buscarPorDocumento(documentoIdentidad: string) {
    return await prisma.medico.findUnique({ where: { documentoIdentidad } })
  }
}