import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.svg'
import './style.css'


function Header() {
    return (
        <nav className='nav-container'>
            <img className='home-logo' src={Logo} />
            <NavLink className='link'>Accueil</NavLink>
            <NavLink className='link' >Profil</NavLink>
            <NavLink className='link'>Réglage</NavLink>
            <NavLink className='link'>Communauté</NavLink>
        </nav>
        
    )
}

export default Header