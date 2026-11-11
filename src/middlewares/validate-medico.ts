import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export const esquemaMedico = z.object({
  documentoIdentidad: z.string().min(1, 'El documento de identidad es obligatorio'),
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  apellido: z.string().min(1, 'El apellido es obligatorio'),
  correo: z.string().email('El correo electrónico no es válido'),
  telefono: z.string().min(1, 'El teléfono es obligatorio'),
  // Exigimos que la especialidad sea un número entero positivo
  especialidadId: z.number().int().positive('La especialidad seleccionada no es válida')
})

export const validarMedico = (req: Request, res: Response, next: NextFunction) => {
  try {
    esquemaMedico.parse(req.body)
    next()
  } catch (error: any) {
    return res.status(400).json({
      exito: false,
      mensaje: 'Los datos del médico no son válidos',
      errores: error.errors
    })
  }
}