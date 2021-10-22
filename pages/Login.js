import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
const Login = ( ) => {

    const router = useRouter()
    const [auth,setAuth] = useState(false)
    const [id,setId] = useState("")
    const [senha,setSenha] = useState("")

    const autorizar = ( id, senha ) => {
      console.log(id,senha)  
      setAuth(true)
        if (auth == true) {
            router.push('/Homepage')
        };
    }

    return (
        <ul>
      <div>
        <li><label>Username</label></li>
        <li><input type="text" onChange={(e) => setId(e.target.value)}></input></li>
      </div>
      <div>
        <li><label>Senha</label></li>
        <li><input type="text" onChange={(e) => setSenha(e.target.value)}></input></li>
      </div>
      <li>
      <a>
        <button type="button" onClick = {() => autorizar(id, senha)}>
            Entrar
        </button>
      </a>
          
      </li>
    </ul>
        
     );
}
 
export default Login;