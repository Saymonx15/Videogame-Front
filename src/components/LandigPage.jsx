import React from "react";
import {Link} from "react-router-dom";
import style from "./Landing.module.css";


export default function LandigPage(){
    return(
        <div className={style.landingPage}>
            <h1 className={style.TitleLanding}>Bienvenidos a mi web</h1>
            <Link to="/home">
                <button className={style.btnHome}>Home</button>
            </Link>
        </div>
    )
}