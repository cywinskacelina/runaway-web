import React, { useEffect } from "react"
import {Link} from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Admin from "../Admin/admin";
import check from "../Auth/check";
import AccountBar from "../AccountBar/AccountBar";

export default function ChatPage(props) {
  useEffect(() => {
    async function checkAccess() {
      if (!(await check("admin"))) {
        window.location = "/login";
      }
    }
    checkAccess();
  });
  return (
    <div
      style={{ position: "absolute", width: "100%", height: "100%" }}
      className="con container row"
    >
      <NavBar pages={[["Blog","/blog/allposts"], ["Chat","/chat/observe"]]} />
      <div className = "col-10">
      <AccountBar/>
      <Admin />
      </div>
    </div>
  );
}
