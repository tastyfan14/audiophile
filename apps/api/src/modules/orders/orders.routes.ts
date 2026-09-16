import { Router } from 'express'

import { createOrderController } from './orders.controller.js'

const router = Router()

router.post('/api/checkout/create', createOrderController)

export default router