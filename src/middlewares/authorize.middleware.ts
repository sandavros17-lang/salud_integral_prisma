import { Request, Response, NextFunction } from 'express'
import { AuthPayload } from './auth.middleware.js'

// -------------verificacion del rol y sus permisos o lo q puede hacer-----------
export function authorize(...roles: AuthPayload['role'][]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No tienes permiso para acceder' })
    }
    next()
  }
}