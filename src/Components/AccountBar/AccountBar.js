import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";
import "./AccountBar.css";
export default function(){
    const[user,setUser] = useState({});
    const[redirect, setRedirect] = useState("");
    function signOut(){
        localStorage.removeItem("JWT");
        localStorage.removeItem("USER");
        window.location.href = "/";
    }
    useEffect(()=>{
        let temp = localStorage.getItem("EMAIL");
        let access = localStorage.getItem("ACCESS");
        if(temp){
            setUser(temp);
            if(access === "admin") setRedirect("/admin/overview");
            else if(access === "blog editor") setRedirect("/blog/allposts");
            else if(access === "volunteer") setRedirect("/chat/observe");
        }
    },[])
    return(
        <div className = "accountBar">
            <div className = "accountContainer">
                <div id = "signOut" onClick = {signOut}>Sign Out</div>
                {`Welcome Back, ${user}`}
                <Link to = {redirect}>
                    <img className = "avatar" src = "/asset/avatar.svg"/>
                </Link>
            </div>
        </div>
    )
}