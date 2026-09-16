import express from 'express'
import cors from 'cors'
import ProductRouter from './modules/products/products.routes.js'
import CheckoutRouter from './modules/orders/orders.routes.js'

const PORT = process.env.PORT

const app = express()

app.use(
    cors({
        origin: process.env.CLIENT_URL,
    }),
)

app.use(express.json())

app.use(ProductRouter)

app.use(CheckoutRouter)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))