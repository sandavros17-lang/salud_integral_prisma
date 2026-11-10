import { prisma } from "../config/prisma.js"

export const medicoModel = {
  
  // Obtiene todos los médicos incluyendo los datos de su especialidad
  async getAllDoctors() {
    return await prisma.medico.findMany({
      include: { especialidad: true },
      orderBy: { id: 'desc' }
    })
  },

  // Busca un médico por su ID incluyendo su especialidad. Retorna null si no existe
  async getDoctorById(id: number) {
    return await prisma.medico.findUnique({
      where: { id },
      include: { especialidad: true }
    })
  },

  // Crea un nuevo médico en la base de datos y retorna su información con la especialidad
  async createDoctor(data: any) {
    return await prisma.medico.create({
      data,
      include: { especialidad: true }
    })
  },

  // Funciones de validación auxiliar
  async buscarPorCorreo(correo: string) {
    return await prisma.medico.findUnique({ where: { correo } })
  },

  async buscarPorDocumento(documentoIdentidad: string) {
    return await prisma.medico.findUnique({ where: { documentoIdentidad } })
  }
}