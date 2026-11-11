import { Request, Response } from 'express'
import { citaSchema } from '../validators/cita.validator.js'
import { citaModel } from '../models/cita.model.js'
import { prisma } from '../config/prisma.js'

export async function crearCita(req: Request, res: Response) {
  try {
    // 1. Validar los datos con Zod
    const validData = citaSchema.parse(req.body)

    // 2. Confirmar que el paciente existe
    const pacienteExiste = await prisma.paciente.findUnique({
      where: { id: validData.pacienteId }
    })
    if (!pacienteExiste) {
      return res.status(404).json({ message: 'El paciente especificado no existe' })
    }

    // 3. Confirmar que el médico existe
    const medicoExiste = await prisma.medico.findUnique({
      where: { id: validData.medicoId }
    })
    if (!medicoExiste) {
      return res.status(404).json({ message: 'El médico especificado no existe' })
    }

    // 4. Crear la cita (el estado nace en PROGRAMADA por defecto)
    const nuevaCita = await citaModel.createCita(validData)
    
    return res.status(201).json({ exito: true, datos: nuevaCita })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ exito: false, errores: error.errors })
    }
    console.error('Error al agendar cita:', error)
    return res.status(500).json({ message: 'Error al agendar la cita' })
  }
}

// Nueva función añadida para la Parte 2 (Agenda del médico por rango de fechas)
export async function obtenerAgendaMedico(req: Request, res: Response) {
  try {
    const medicoId = Number(req.params.id)
    const { from, to } = req.query

    let fechaInicio: Date | undefined
    let fechaFin: Date | undefined

    if (from && to) {
      fechaInicio = new Date(from as string)
      fechaFin = new Date(to as string)
    }

    const agenda = await citaModel.getDoctorAgenda(medicoId, fechaInicio, fechaFin)

    return res.json({ exito: true, datos: agenda })
  } catch (error) {
    console.error('Error al obtener la agenda del médico:', error)
    return res.status(500).json({ message: 'Error al consultar la agenda' })
  }
}

// Nueva función para la Parte 3 (Actualización parcial de la cita)
export async function actualizarCitaParcial(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const datosActualizar = req.body

    // Si viene fechaHora en el body, la convertimos a objeto Date
    if (datosActualizar.fechaHora) {
      datosActualizar.fechaHora = new Date(datosActualizar.fechaHora)
    }

    const citaActualizada = await citaModel.updateCita(id, datosActualizar)

    return res.json({ exito: true, datos: citaActualizada })
  } catch (error) {
    console.error('Error al actualizar la cita:', error)
    return res.status(500).json({ message: 'Error al actualizar la cita' })
  }
}