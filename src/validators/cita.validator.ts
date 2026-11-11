import { z } from 'zod'

export const citaSchema = z.object({
  pacienteId: z.number().int().positive('El ID del paciente debe ser válido'),
  medicoId: z.number().int().positive('El ID del médico debe ser válido'),
  fechaHora: z.coerce.date().min(new Date(), 'No puedes agendar una cita en una fecha que ya pasó'),
  motivo: z.string().min(5, 'El motivo de consulta debe tener al menos 5 caracteres').optional(),
})