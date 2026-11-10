import { Request, Response } from 'express'
import { medicoModel } from '../models/medico.model.ts'

export const medicoController = {

  // GET /api/medico - Lista todos los médicos
  async listarMedicos(req: Request, res: Response) {
    try {
      const medicos = await medicoModel.getAllDoctors()
      return res.status(200).json({
        exito: true,
        datos: medicos
      })
    } catch (error) {
      console.error('Error al listar médicos:', error)
      return res.status(500).json({ exito: false, mensaje: 'Error interno del servidor' })
    }
  },

  // GET /api/medico/:id - Busca un médico por ID (404 si no existe)
  async obtenerMedicoPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string)
      const medico = await medicoModel.getDoctorById(id)

      if (!medico) {
        return res.status(404).json({
          exito: false,
          mensaje: 'Médico no encontrado'
        })
      }

      return res.status(200).json({
        exito: true,
        datos: medico
      })
    } catch (error) {
      console.error('Error al buscar médico:', error)
      return res.status(500).json({ exito: false, mensaje: 'Error interno del servidor' })
    }
  },

  // POST /api/medico - Registra un nuevo médico validado
  async crearMedico(req: Request, res: Response) {
    try {
      const { documentoIdentidad, correo, ...restoDatos } = req.body

      // Validamos si ya existe el documento
      const medicoDoc = await medicoModel.buscarPorDocumento(documentoIdentidad)
      if (medicoDoc) {
        return res.status(400).json({ exito: false, mensaje: 'Ya existe un médico registrado con este documento' })
      }

      // Validamos si ya existe el correo
      const medicoCorreo = await medicoModel.buscarPorCorreo(correo)
      if (medicoCorreo) {
        return res.status(400).json({ exito: false, mensaje: 'Ya existe un médico registrado con este correo' })
      }

      const nuevoMedico = await medicoModel.createDoctor({
        documentoIdentidad,
        correo,
        ...restoDatos
      })

      return res.status(201).json({
        exito: true,
        mensaje: 'Médico registrado exitosamente',
        datos: nuevoMedico
      })
    } catch (error) {
      console.error('Error al crear médico:', error)
      return res.status(500).json({ exito: false, mensaje: 'Error interno del servidor' })
    }
  }
}