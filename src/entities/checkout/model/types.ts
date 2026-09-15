import z from 'zod'
import { checkoutSchema } from './schema'

// for schema

export type CheckoutSchema = z.infer<typeof checkoutSchema>

//

export type CheckoutPaymentOption = {
    id: string
    value: string
    label: string
}