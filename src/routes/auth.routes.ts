import { Router } from 'express'
import { register, login } from '../controllers/auth.controller'

const router = Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión para obtener el token JWT
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Autenticación exitosa y retorno del token
 */

router.post('/register', register)
router.post('/login', login)

export default router