import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
    <div class="logo">
        <h1>Truco Omline</h1>
    </div>
    
    <ul className="links">
      <li><Link href="/Homepage"><a><button>Home</button></a></Link></li>
      <li><Link href="/Sobre"><a><button>Sobre</button></a></Link></li>
      <li><Link href="/Perfil"><a><button>Perfil</button></a></Link></li>
    </ul>
    </nav> 
);
}
 
export default Navbar;