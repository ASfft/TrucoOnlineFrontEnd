import Link from "next/Link";
import Head from 'next/head'

const NotFound = () => {
    return ( 

    <>

    <Head>
        <title>Truco | 404</title>
    </Head>

    <div class="not-found-margin">

            <img class="center" src="/gatinho.png"/>
        <div class="not-found">
            <p>Essa pagina não existe</p>
            <p><Link href="/Homepage"><a>Homepage</a></Link></p>
        </div>
    </div>

    </>
     );
}
 
export default NotFound