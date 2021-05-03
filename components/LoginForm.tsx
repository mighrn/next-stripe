import React, { useState } from 'react'
import { fetchPostJSON } from '../utils/api-helpers'

const LoginForm = () => {
    const [input, setInput] = useState({
        userEmail: '',
        userPass: '',
    })

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
        setInput({
            ...input,
            [e.currentTarget.name]: e.currentTarget.value,
    })

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        // Query db for email, pass combo
        const dbResponse = await fetchPostJSON('/api/db/get_customer', {
            email: input.userEmail,
            pass: input.userPass,
        })
        
        if (dbResponse.statusCode === 500) {
            console.error(dbResponse.message)
            return
        }
        const portalResponse = await fetchPostJSON('/api/portal_sessions',
            dbResponse
        )
        
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
            <input type='password'
            className="checkout-style"
            name={'userPass'}
            value={input.userPass}
            onChange={handleInputChange}
            placeholder='Password'
            required
            />
      
            <button
            className="checkout-style-background"
            type="submit"
            disabled={!input.userEmail.length || !input.userPass.length}
            >
                Login
            </button>
        </form>
    )
}

export default LoginForm
