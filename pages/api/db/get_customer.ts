import {NextApiRequest, NextApiResponse} from 'next'
import {query} from '../../../lib/db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
    if (req.method === 'POST') {
        const email: string = req.body.email
        const pass: string = req.body.pass
        try {
            // Validate the email and password that was passed from the client.
            if (!(email || pass)) {
                throw new Error('Email and Password both required')
            }
            const results = await query(
                `
                SELECT customer
                FROM users
                WHERE email = ? AND passhash = ?
                `,
                [email, pass]
            )
            if (!(results)) {
                throw new Error('No Customer with that Email and Password found')
            }

            res.status(200).json({results})
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message })
        }
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}
