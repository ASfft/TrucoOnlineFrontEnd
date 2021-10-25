import Head from 'next/head'
import Link from "next/link";

export default function Home() {

  return (
    <>

    <Head>
        <title>Truco | Home </title>
    </Head>

        <div className="container">
            <Link href="/Modos"><button>Jogar</button></Link>
        </div>
        </>
  )
}
