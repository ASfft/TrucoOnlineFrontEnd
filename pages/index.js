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
        <title>Truco | Login</title>
    </Head>

  <form className="container">
    <Login />
  </form>
    
    </>
  )
}
