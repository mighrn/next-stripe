import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage: NextPage = () => {
    return(
        <Layout title='Home | unpaused.xyz'>
            <ul className='card-list'>
                <li>
                    <Link href='/donate'>
                        <a className='card checkout-style-background'>
                            <h2 className='bottom'>Donate!</h2>
                            <img src='/red-heart.png'></img>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href='/social'>
                        <a className='card elements-style-background'>
                            <h2 className='bottom'>Socials</h2>
                            <img src='/social.png'></img>
                        </a>
                    </Link>
                </li>
            </ul>
        </Layout>
    )
}

export default IndexPage
