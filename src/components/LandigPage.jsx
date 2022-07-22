import React from "react";
import {Link} from "react-router-dom";


export default function LandigPage(){
    return(
        <div className="landing-page">
            <h1>Bienvenidos a mi web</h1>
            <Link to="/home">
                <button className="btn btn-primary">Home</button>
            </Link>
        </div>
    )
}