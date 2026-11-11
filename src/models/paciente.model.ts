import { prisma } from "../config/prisma.js"

export const pacienteModel = {
  
// Obtiene la lista completa de todos los pacientes.
      
  async getAllPatients() {
    return await prisma.paciente.findMany({
      orderBy: { id: 'desc' }
    })
  },

// Busca un paciente por su ID único. Retorna null si no existe.
    
  async getPatientById(id: number) {
    return await prisma.paciente.findUnique({
      where: { id }
    })
  },

  
// Crea un nuevo paciente en la base de datos.
  
  async createPatient(data: any) {
    return await prisma.paciente.create({
      data
    })
  },

  // buscar por el correo y por cedula
  async buscarPorCorreo(correo: string) {
    return await prisma.paciente.findUnique({ where: { correo } })
  },

  async buscarPorDocumento(documentoIdentidad: string) {
    return await prisma.paciente.findUnique({ where: { documentoIdentidad } })
  }
}