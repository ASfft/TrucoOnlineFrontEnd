import Head from 'next/head'
import Link from "next/Link";
import id from '../comps/Login'

export const getStaticProps = async () => {

    const id = 1
    const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id)
    const data = await res.json();

    return {
        props: { jogador: data }
    }

}


const Perfil = ({ jogador }) => {
    return ( 

    <>

    <Head>
        <title>Truco | Jogador</title>
    </Head>

    <div className="jogador">
        <ul>
            <h1>{ jogador.name }</h1>
            <p><li>{ jogador.username }</li></p>
            <p><li>{ jogador.email }</li></p>
        </ul>
    </div>
    

    </>
     );
}
 
export default Perfil;