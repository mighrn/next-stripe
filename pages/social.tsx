import { NextPage } from 'next'
import Layout from '../components/Layout'
import SocialLinks from '../components/SocialLinks'

const SocialPage: NextPage = () => {
    return(
        <Layout title='Links to all Social Media | unpaused.xyz'>
            <div className='page-container'>
                <SocialLinks/>
            </div>
        </Layout>
    )
}

export default SocialPage
