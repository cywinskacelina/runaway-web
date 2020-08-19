import React from "react";
import NavCell from "./NavCell.js";
import "../../styles/navBar.css";


export default function NavBar(props){
    return(
        <div className = "col-2" >
            <div className= "navBar position-fixed">
                <img src = "/asset/logo.svg" className = "logo" alt="logo"></img>
                {
                    props.pages.map(item =>{
                        console.log(item);
                        return React.createElement(NavCell,{item : item});
                    })
                }
            </div>
        </div>
    )
}