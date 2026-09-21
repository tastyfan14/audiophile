import express from 'express'
import cors from 'cors'
import ProductRouter from './modules/products/products.routes.js'
import CheckoutRouter from './modules/orders/orders.routes.js'

const app = express()

app.use(
    cors({
        origin: process.env.CLIENT_URL,
    }),
)

app.use(express.json())

app.use(ProductRouter)

app.use(CheckoutRouter)

export default app