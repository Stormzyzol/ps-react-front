import { useRef } from 'react'
import style from './navbar.module.css'


export default function Navbar(props){
    const navref = useRef()
    const hamref = useRef()
    const showNavbar = () => {
        navref.current.classList.toggle(style.active)
        hamref.current.classList.toggle(style.is_active)
    

    }
    return(

        <nav className={style.navbar}>
            
            <ul className={style.navbar_nav}>
                <img className={style.logo} src={props.logo} alt="" />
                <h2>{props.slogan}</h2>
                <div className={style.search}>
                        <input type="text" name='query' className={style.search_input} placeholder="Buscar"/>
                        <button className={style.search_submit} type="submit"><span class="material-symbols-outlined">
                                search
                            </span></button>
                    </div>

                <div className={style.nav_links} ref={navref}>

                    
                    {props.children}
                    
                </div>

                <li className={style.nav_item}>

                    <div className={style.hamburguer} ref={hamref} onClick={showNavbar}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </li>
            </ul>
            
        </nav>

        
    )
}

