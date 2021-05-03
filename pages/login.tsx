import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'

const LoginPage: NextPage = () => {
    return(
        <Layout title='Login | unpaused.xyz'>
            <div className='page-container'>
                <LoginForm/>
                <Link href='/reset'>Reset My Password</Link>
            </div>
        </Layout>
    )
}

export default LoginPage
