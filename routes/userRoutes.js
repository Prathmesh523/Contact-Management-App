import express from 'express'
import { currentUser, loginUser, registerUser } from '../controllers/userController.js'
import validateToken from '../middlewares/validateTokenHandler.js'

const router = express.Router()

router.route('/register')
    .post(registerUser)

router.route('/login')
    .post(loginUser)

router.get('/current',validateToken,currentUser)
export default router