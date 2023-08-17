import style from './cards.module.css'

export default function cards(props){
    return(
        <div className={style.card}>
            <img src={props.img} alt="" className={style.card_img} />
            <div className={style.card_body}>
                <div>
                    <h2 className={style.card_name}>{props.name}</h2>
                    <p className={style.card_team_age}> Time: {props.team}</p>
                    <p className={style.card_team_age}> Idade: {props.age} anos</p>
                    <p className={style.card_nationality}>Nacionalidade: {props.nationality}</p>
                </div>
                <div className={style.btn_div}>
                    <button className={style.card_btn}>Saiba mais</button>
                </div>
            </div>
        </div>
    )
}