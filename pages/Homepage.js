import { useState } from "react";
import Footer from "../comps/Footer";
import Navbar from "../comps/Navbar";
import Head from "next/Head"

const Homepage = () => {
    return ( 
        <>

    <Head>
        <title>Truco | Home </title>
    </Head>

        <div class="container">
            <button>Jogar</button>
        </div>
        </>
     );
}
 
export default Homepage;