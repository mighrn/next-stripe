import { NextPage } from 'next'
import Layout from '../components/Layout'
import CheckoutForm from '../components/CheckoutForm'

const DonatePage: NextPage = () => {
    return(
        <Layout title='Donate with Card or Crypto | unpaused.xyz'>
            <div className='page-container'>
                <CheckoutForm />
            </div>
        </Layout>
    )
}

export default DonatePage
