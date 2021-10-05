import Head from 'next/head'
import Image from 'next/image'
import Footer from '../comps/Footer'
import Navbar from '../comps/Navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    <Head>
        <title>Truco | Home</title>
    </Head>
    <div class="container">
      <button>Jogar</button>
    </div>
    </>
  )
}
