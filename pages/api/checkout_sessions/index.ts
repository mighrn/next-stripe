import {NextApiRequest, NextApiResponse} from 'next'
import {CURRENCY, MIN_AMOUNT, MAX_AMOUNT} from '../../../config'
import {formatAmountForStripe} from '../../../utils/stripe-helpers'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const amount: number = req.body.amount
        const mode: Stripe.Checkout.SessionCreateParams.Mode = req.body.mode
        try {
            // Validate the amount that was passed from the client.
            if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
                throw new Error('Invalid amount.')
            }
                        
            const params: Stripe.Checkout.SessionCreateParams =
            (mode == 'payment')
            ?
            {
                payment_method_types: ['card'],
                mode: mode,
                line_items: [
                    {
                        price_data: {
                            currency: CURRENCY,
                            unit_amount: formatAmountForStripe(amount, CURRENCY),
                            product_data: {
                                name: 'One-Time Donation'
                            }
                        },
                        quantity: 1,
                    },
                ],
                success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/donate`,
            }
            :
            {
                payment_method_types: ['card'],
                mode: mode,
                line_items: [
                    {
                        price_data: {
                            currency: CURRENCY,
                            unit_amount: formatAmountForStripe(amount, CURRENCY),
                            recurring: {
                                interval: 'month'
                            },
                            product_data: {
                                name: 'Monthly Donation'
                            }
                        },
                        quantity: 1,
                    },
                ],
                success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/donate`,
            }

            const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
                params
            )

            res.status(200).json(checkoutSession)
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message })
        }
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}
