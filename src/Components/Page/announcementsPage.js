import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Announcements from "../Announcements/announcements";
import check from "../Auth/check";
import AccountBar from "../AccountBar/AccountBar";

export default function BlogPage(props) {
  useEffect(() => {
    async function checkAccess() {
      if (!(await check("blog editor"))) {
        window.location = "/login";
      }
    }
    checkAccess();
  }, []);

  return (
    <div
      style={{ position: "absolute", width: "100%", height: "100%" }}
      className="con container row"
    >
      <NavBar
        pages={[
          ["Blog", "/blog/allposts"],
          ["Chat", "/chat/observe"],
        ]}
      />
      <div className="col-10">
        <AccountBar />
        <Announcements />
      </div>
    </div>
  );
}
