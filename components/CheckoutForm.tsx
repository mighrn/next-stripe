import React, { useState } from 'react'

import CustomDonationInput from '../components/CustomDonationInput'
import CustomModeSelect from './CustomModeSelect'

import getStripe from '../utils/get-stripejs'
import { fetchPostJSON } from '../utils/api-helpers'
import { formatAmountForDisplay } from '../utils/stripe-helpers'
import * as config from '../config'

const CheckoutForm = () => {
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        customDonation: 5.0,
    })
    const [select, setSelect] = useState({
        customMode: 'subscription',
    })

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
        setInput({
            ...input,
            [e.currentTarget.name]: e.currentTarget.value,
    })

    const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
        setSelect({
            ...select,
            [e.currentTarget.name]: e.currentTarget.value,
    })

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)
        // Create a Checkout Session.
        const response = await fetchPostJSON('/api/checkout_sessions', {
            amount: input.customDonation,
            mode: select.customMode,
        })

        if (response.statusCode === 500) {
            console.error(response.message)
            return
        }

        // Redirect to Checkout.
        const stripe = await getStripe()
        const { error } = await stripe!.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: response.id,
        })
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        console.warn(error.message)
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <CustomDonationInput
            className="checkout-style"
            name={'customDonation'}
            value={input.customDonation}
            min={config.MIN_AMOUNT}
            max={config.MAX_AMOUNT}
            step={config.AMOUNT_STEP}
            currency={config.CURRENCY}
            onChange={handleInputChange}
            />
            <CustomModeSelect className='checkout-style' name={'customMode'} value={select.customMode} onChange={handleSelectChange}/>
      
            <button
            className="checkout-style-background"
            type="submit"
            disabled={loading}
            >
                Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
            </button>
        </form>
    )
}

export default CheckoutForm
