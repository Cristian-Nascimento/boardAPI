import { Router } from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import board from './board/routes'

const router = new Router()

router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/board', board)

export default router
