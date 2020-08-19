import React from "react";
import {Link} from "react-router-dom";


export default function NavCell(props){
    return(
        <div className = "navCell">
            <Link to = {props.item[1]}>{props.item[0]}</Link>
        </div>
    )
}