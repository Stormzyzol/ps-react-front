import Navbar from '../../../components/playerpage/navbar/navbar'
import NavItems from '../../../components/playerpage/navbar/navitems'
import Dropdown from '../../../components/playerpage/navbar/dropdown'
import style from './style.module.css'
import Cards from '../../../components/playerpage/cards/cards'
import FooterM from '../../../components/playerpage/footer/footer'


export default function PlayersPage(){
    return(
        <div className={style.playerspage}>
            <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
        integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <Navbar
        logo="https://emojitool.com/img/htc/sense-7/soccer-ball-483.png"
        >
        <NavItems
            link="#"
            icon="Inicio">
            
            </NavItems>

            <NavItems
            link="#0"
            icon="Time">
            <Dropdown
            link="#"
            children="Cruzeiro"/> 
            <Dropdown
            link="#"
            children="Atletico"/> 
            <Dropdown
            link="#"
            children="Flamengo"/> 
            
            </NavItems>

            <NavItems
            link="javascript:;"
            icon="Nacionalidade"
            >
            <Dropdown
            link="#"
            children="Brasileiro"/> 
            <Dropdown
            link="#"
            children="Argentino"/> 
            <Dropdown
            link="#"
            children="Chileno"/> 
            
            </NavItems>


    </Navbar>

        <div className={style.wrapper}>
            <Cards
                img="https://conteudo.imguol.com.br/c/esporte/b8/2022/10/11/vini-jr-do-real-madrid-em-jogo-contra-o-shakhtar-pela-liga-dos-campeoes-1665522959902_v2_1x1.jpg"
                name="Vini Jr"
                team="Real Madrid"
                age="23"
                nationality="Brasileiro"/>

            <Cards
                img="https://conteudo.imguol.com.br/c/esporte/cc/2023/07/27/neymar-durante-aquecimento-do-psg-antes-de-amistoso-contra-o-al-nassr-1690473390851_v2_4x3.jpg"
                name="Neymar Jr"
                team="Paris Saint-Germain"
                age="31"
                nationality="Brasileiro"/>

            <Cards
                img="https://conteudo.imguol.com.br/c/esporte/b8/2022/10/11/vini-jr-do-real-madrid-em-jogo-contra-o-shakhtar-pela-liga-dos-campeoes-1665522959902_v2_1x1.jpg"
                name="Vini Jr"
                team="Real Madrid"
                age="23"
                nationality="Brasileiro"/>

            <Cards
                img="https://conteudo.imguol.com.br/c/esporte/cc/2023/07/27/neymar-durante-aquecimento-do-psg-antes-de-amistoso-contra-o-al-nassr-1690473390851_v2_4x3.jpg"
                name="Neymar Jr"
                team="Paris Saint-Germain"
                age="31"
                nationality="Brasileiro"/>

            <Cards
                img="https://conteudo.imguol.com.br/c/esporte/b8/2022/10/11/vini-jr-do-real-madrid-em-jogo-contra-o-shakhtar-pela-liga-dos-campeoes-1665522959902_v2_1x1.jpg"
                name="Vini Jr"
                team="Real Madrid"
                age="23"
                nationality="Brasileiro"/>

            <Cards
                img="https://conteudo.imguol.com.br/c/esporte/cc/2023/07/27/neymar-durante-aquecimento-do-psg-antes-de-amistoso-contra-o-al-nassr-1690473390851_v2_4x3.jpg"
                name="Neymar Jr"
                team="Paris Saint-Germain"
                age="31"
                nationality="Brasileiro"/>

            <Cards
                img="https://conteudo.imguol.com.br/c/esporte/b8/2022/10/11/vini-jr-do-real-madrid-em-jogo-contra-o-shakhtar-pela-liga-dos-campeoes-1665522959902_v2_1x1.jpg"
                name="Vini Jr"
                team="Real Madrid"
                age="23"
                nationality="Brasileiro"/>

            <Cards
                img="https://conteudo.imguol.com.br/c/esporte/cc/2023/07/27/neymar-durante-aquecimento-do-psg-antes-de-amistoso-contra-o-al-nassr-1690473390851_v2_4x3.jpg"
                name="Neymar Jr"
                team="Paris Saint-Germain"
                age="31"
                nationality="Brasileiro"/>

            <Cards 
                img="https://conteudo.imguol.com.br/c/esporte/b8/2022/10/11/vini-jr-do-real-madrid-em-jogo-contra-o-shakhtar-pela-liga-dos-campeoes-1665522959902_v2_1x1.jpg"
                name="Vini Jr"
                team="Real Madrid"
                age="23"
                nationality="Brasileiro"/>

            <Cards
                img="https://conteudo.imguol.com.br/c/esporte/cc/2023/07/27/neymar-durante-aquecimento-do-psg-antes-de-amistoso-contra-o-al-nassr-1690473390851_v2_4x3.jpg"
                name="Neymar Jr"
                team="Paris Saint-Germain"
                age="31"
                nationality="Brasileiro"/>
    
        </div>

        <footer>
    <FooterM
    name="FuteInfo"
    slogan="O Futebol está aqui"
    social1="fa-brands fa-instagram"
    social2="fa-brands fa-twitter"
    social3="fa-brands fa-linkedin-in"
    link1="#"
    link2="#"
    link3="#"
    link4="#"
    empresa1="Central de Noticias"
    empresa2="Nosso App"
    parceria1="Coca-Cola"
    parceria2="Rexona"></FooterM>
  </footer>
    </div>
    )
}