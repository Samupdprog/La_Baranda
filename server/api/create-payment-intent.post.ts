import Stripe from "stripe"
import { defineEventHandler, readBody, createError } from "h3"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
})

export default defineEventHandler(async (event) => {
  // 1) Leer los items enviados desde el front
  const { items } = await readBody<{
    items: { productId: string; quantity: number }[]
  }>(event)

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw createError({ statusCode: 400, message: "No se han enviado artículos" })
  }

  // 2) Calcular el total en céntimos
  let amount = 0
  for (const { productId, quantity } of items) {
    const product = await stripe.products.retrieve(productId, {
      expand: ["default_price"],
    })
    const price = product.default_price as Stripe.Price
    if (!price.unit_amount) {
      throw createError({ statusCode: 500, message: `Producto ${productId} sin precio` })
    }
    amount += price.unit_amount * quantity
  }

  // 3) Crear el PaymentIntent solo con tarjetas
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "eur",
    payment_method_types: ["card"],
  })

  return { clientSecret: paymentIntent.client_secret }
})
