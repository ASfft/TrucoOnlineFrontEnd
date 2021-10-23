import Head from 'next/head'
import Link from "next/link";

export default function Modos() {
    return(
    <>

    <Head>
        <title>Truco | Modos </title>
    </Head>

        <div className="container">
            <ul>
            <li><Link href="/IA"><button>Contra IA</button></Link></li>
            <li><Link href="/Multyplayer"><button>Multiplayer</button></Link></li>
            </ul>
        </div>
        </>
);}