import { Request, Response } from 'express'
import { prisma } from '../config/prisma' // Ajusta la ruta de tu cliente Prisma si es distinta

// Obtener todas las especialidades
export const obtenerEspecialidades = async (req: Request, res: Response) => {
  try {
    const especialidades = await prisma.especialidad.findMany()
    return res.status(200).json({
      exito: true,
      datos: especialidades
    })
  } catch (error: any) {
    return res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener las especialidades',
      error: error.message
    })
  }
}

// Crear una especialidad
export const crearEspecialidad = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body

    if (!nombre) {
      return res.status(400).json({
        exito: false,
        mensaje: 'El nombre de la especialidad es obligatorio'
      })
    }

    const nuevaEspecialidad = await prisma.especialidad.create({
      data: { nombre }
    })

    return res.status(201).json({
      exito: true,
      mensaje: 'Especialidad creada exitosamente',
      datos: nuevaEspecialidad
    })
  } catch (error: any) {
    return res.status(500).json({
      exito: false,
      mensaje: 'Error al crear la especialidad',
      error: error.message
    })
  }
}