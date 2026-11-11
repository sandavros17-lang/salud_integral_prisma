import { prisma } from "../config/prisma.js"

export const pacienteModel = {

  // Obtiene la lista completa de todos los pacientes.
  async getAllPatients() {
    return await prisma.paciente.findMany({
      orderBy: { id: 'desc' }
    })
  },

  // Obtiene un paciente por ID con su expediente completo (relaciones anidadas)
  async getPatientById(id: number) {
    return await prisma.paciente.findUnique({
      where: { id },
      include: {
        citas: { // Relación hacia la tabla citas
          include: {
            medico: { // Relación de la cita hacia el médico
              include: {
                especialidad: true // Relación del médico hacia la especialidad
              }
            }
          },
          orderBy: { fechaHora: 'desc' } // Ordenar de la cita más reciente a la más antigua
        }
      }
    })
  },

  // Crea un nuevo paciente en la base de datos.
  async createPatient(data: any) {
    return await prisma.paciente.create({
      data
    })
  },

  // Buscar por correo
  async buscarPorCorreo(correo: string) {
    return await prisma.paciente.findUnique({ where: { correo } })
  },

  // Buscar por documento de identidad
  async buscarPorDocumento(documentoIdentidad: string) {
    return await prisma.paciente.findUnique({ where: { documentoIdentidad } })
  }
}