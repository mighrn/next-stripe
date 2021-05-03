import {NextPage} from 'next'
import {useRouter} from 'next/router'
import useSWR from 'swr'
import Layout from '../components/Layout'
import PrintObject from '../components/PrintObject'
import {fetchGetJSON} from '../utils/api-helpers'

const ResultPage: NextPage = () => {
    const router = useRouter()
    //Fetch CheckoutSession from static page via
    //https://nextjs.org/docs/basic-features/data-fetching#static-generation
    const {data, error} = useSWR(
        router.query.session_id
        ? `/api/checkout_sessions/${router.query.session_id}`
        : null,
        fetchGetJSON
    )
    if (error) return <div>Failed to load results</div>

    return(
        <Layout title='Donation Results | unpaused.xyz'>
            <div className='page-container'>
                <h1>Thank You!</h1>
                <h2>Status: {data?.payment_intent?.status ?? 'Loading...'}</h2>
                <h3>Checkout Session response:</h3>
                <PrintObject content={data ?? 'Loading...'}/>
            </div>
        </Layout>
    )
}

export default ResultPage
