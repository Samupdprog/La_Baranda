import Stripe from "stripe"
import { defineEventHandler, readBody, createError } from "h3"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
})

export default defineEventHandler(async (event) => {
  // 1) Leer los datos de la reserva
  const {
    reservation_id,
    name,
    surname,
    email,
    phone,
    language,
    people_count,
    date,
    time,
    brunch_summary,
    brunches,
    total_brunchs,
    payment_method,
    payment_type,
    total_amount,
    total_amount_formatted,
    deposit_amount,
    deposit_amount_formatted,
    allergies
  } = await readBody<{
    reservation_id: string
    name: string
    surname: string
    email: string
    phone: string
    language: string
    people_count: number
    date: string         // "YYYY-MM-DD"
    time: string         // "HH:MM"
    brunch_summary: string
    brunches: any[]      // tu array de brunches
    total_brunchs: number
    payment_method: string
    payment_type: string
    total_amount: number // en céntimos
    total_amount_formatted: string
    deposit_amount: number
    deposit_amount_formatted: string
    allergies: string
  }>(event)

  if (!total_amount || !reservation_id) {
    throw createError({ statusCode: 400, message: "Falta total_amount o reservation_id" })
  }

  // 2) Crear el PaymentIntent con todo en metadata
  const pi = await stripe.paymentIntents.create({
    amount: total_amount,
    currency: "eur",
    payment_method_types: ["card"],
    metadata: {
      reservation_id,
      name,
      surname,
      email,
      phone,
      language,
      people_count: String(people_count),
      date,
      time,
      brunch_summary,
      brunches: JSON.stringify(brunches),
      total_brunchs: String(total_brunchs),
      payment_method,
      payment_type,
      total_amount: String(total_amount),
      total_amount_formatted,
      deposit_amount: String(deposit_amount),
      deposit_amount_formatted,
      allergies: allergies || 'Ninguna'
    }
  })

  return {
    clientSecret: pi.client_secret,
    paymentIntentId: pi.id
  }
})
