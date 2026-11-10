import { Request, Response } from 'express'
import { pacienteModel } from '../models/paciente.model.ts'

export const pacienteController = {
  // GET /api/pacientes
  async listarPacientes(req: Request, res: Response) {
    try {
      const pacientes = await pacienteModel.getAllPatients()
      return res.status(200).json({
        exito: true,
        datos: pacientes
      })
    } catch (error) {
      console.error('Error al listar pacientes:', error)
      return res.status(500).json({ exito: false, mensaje: 'Error interno del servidor' })
    }
  },

  // GET /api/paciente/:id
  async obtenerPacientePorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string) // asi siempre se convierte en un entero
      const paciente = await pacienteModel.getPatientById(id)

      // Si no existe, retornamos 404 como pide la guía
      if (!paciente) {
        return res.status(404).json({
          exito: false,
          mensaje: 'Paciente no encontrado'
        })
      }

      return res.status(200).json({
        exito: true,
        datos: paciente
      })
    } catch (error) {
      console.error('Error al buscar paciente por ID:', error)
      return res.status(500).json({ exito: false, mensaje: 'Error interno del servidor' })
    }
  },

  // POST /api/paciente
  async crearPaciente(req: Request, res: Response) {
    try {
      const { documentoIdentidad, correo, fechaNacimiento, ...restoDatos } = req.body

      const pacienteExistenteDoc = await pacienteModel.buscarPorDocumento(documentoIdentidad)
      if (pacienteExistenteDoc) {
        return res.status(400).json({ exito: false, mensaje: 'Ya existe un paciente con este documento' })
      }

      const pacienteExistenteCorreo = await pacienteModel.buscarPorCorreo(correo)
      if (pacienteExistenteCorreo) {
        return res.status(400).json({ exito: false, mensaje: 'Ya existe un paciente con este correo' })
      }

      // Usando createPatient tal como lo pide la guía
      const nuevoPaciente = await pacienteModel.createPatient({
        documentoIdentidad,
        correo,
        fechaNacimiento: new Date(fechaNacimiento),
        ...restoDatos
      })

      return res.status(201).json({
        exito: true,
        mensaje: 'Paciente creado exitosamente',
        datos: nuevoPaciente
      })
    } catch (error) {
      console.error('Error al crear paciente:', error)
      return res.status(500).json({ exito: false, mensaje: 'Error interno del servidor' })
    }
  }
}