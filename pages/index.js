import Head from 'next/head'
import Image from 'next/image'
import Footer from '../comps/Footer'
import Navbar from '../comps/Navbar'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import { useEffect, useState } from 'react'
import Login from '../comps/Login'


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
