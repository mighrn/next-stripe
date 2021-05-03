import {NextApiRequest, NextApiResponse} from 'next'

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
        const customer: string = req.body.results
        try {
            // Validate the customerID that was passed from the client.
            if (customer === '') {
                throw new Error('Customer ID required')
            }

            const billingSession: Stripe.BillingPortal.Session = await stripe.billingPortal.sessions.create({
                customer: customer,
                return_url: 'http://unpaused.xyz'
            })
            console.log('Billing Session object', billingSession)

            res.status(200).json(billingSession)
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message })
        }
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}
