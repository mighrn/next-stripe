import { NextPage } from 'next'
import Layout from '../components/Layout'
import ResetForm from '../components/ResetForm'

const ResetPage: NextPage = () => {
    return(
        <Layout title='Reset my Password | unpaused.xyz'>
            <div className='page-container'>
                <ResetForm/>
            </div>
        </Layout>
    )
}

export default ResetPage
