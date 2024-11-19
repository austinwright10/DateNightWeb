// pages/api/create-checkout-session.js

import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = require('stripe')(
  'sk_test_51QDFzEKlEdU0rmKxECBZGKYf40yU1QBYraNp53m3AJQZvh3Hps4pNABPlQgiSjmeDNjRdEf8T7juc9AjUFcoLkWE00Puz98xnY'
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Replace with your actual Price ID from the Stripe dashboard
            price: '{{PRICE_ID}}',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
        automatic_tax: { enabled: true },
      })

      res.status(200).json({ url: session.url })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
