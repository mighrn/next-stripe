import React, { useState } from 'react'
import { fetchPostJSON } from '../utils/api-helpers'

const ResetForm = () => {
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        userEmail: '',
    })

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
        setInput({
            ...input,
            [e.currentTarget.name]: e.currentTarget.value,
    })

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setLoading(true)
        // Query db for email, pass combo
        const response = await fetchPostJSON('/api/db', {
            email: input.userEmail,
        })

        if (response.statusCode === 500) {
            console.error(response.message)
            return
        }
        
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='email'
            className="checkout-style"
            name={'userEmail'}
            value={input.userEmail}
            onChange={handleInputChange}
            placeholder='Email'
            required
            />
      
            <button
            className="checkout-style-background"
            type="submit"
            disabled={loading}
            >
                Reset Password
            </button>
        </form>
    )
}

export default ResetForm
