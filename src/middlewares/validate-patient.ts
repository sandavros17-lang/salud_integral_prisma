import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'


// Esquema de validación con Zod para el módulo de Pacientes.
 
export const esquemaPaciente = z.object({
  documentoIdentidad: z.string().min(1, 'El documento de identidad es obligatorio'),
  nombre: z.string().min(1, 'El nombre del paciente es obligatorio'),
  apellido: z.string().min(1, 'El apellido del paciente es obligatorio'),
  fechaNacimiento: z.coerce.date().max(new Date(), 'La fecha de nacimiento no puede ser una fecha futura'),
  telefono: z.string().min(1, 'El teléfono de contacto es obligatorio'),
  direccion: z.string().min(1, 'La dirección de residencia es obligatoria'),
  correo: z.string().email('El correo electrónico ingresado no tiene un formato válido')
})


// Middleware de Express para validar los datos del paciente antes de pasarlos al controlador.
 
export const validarPaciente = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validamos el cuerpo de la petición contra nuestro esquema de Zod
    esquemaPaciente.parse(req.body)
    
    // Si la validación es exitosa, permitimos que continúe hacia el controlador
    next()
  } catch (error: any) {
    // Si ocurre un error de validación, retornamos un estado 400 con los detalles
    return res.status(400).json({
      exito: false,
      mensaje: 'Los datos ingresados para el paciente no son válidos',
      errores: error.errors
    })
  }
}