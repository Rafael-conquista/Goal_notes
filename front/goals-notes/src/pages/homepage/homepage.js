import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "../../components/Style/homeStyle.css";
import PostsFeeds from "../../components/posts_feed";
import LastGoalsList from "../../components/lastGoalsList";
import IncomingGoalsList from "../../components/incomingGoalsList";
import { verify } from "../../utils/token_verify";
import { get_user } from "../../services/user_requests";

const Homepage = () => {

  const [id, setId] = useState(null);

  async function verify_user(token) {
    const token_id = await verify(token);
    const url = new URL(window.location.href);

    if (sessionStorage.getItem("first_acess")) {
        window.location.href = `/CapCreate`;
    }
    if (url.href.includes(`/${token_id}/`)) {
        console.log('token válido');
    } else {
        console.log('usuário não condiz com a url informada');
        window.location.href = `/`;
    }
    const user = await get_user(token_id);
    return { id: token_id, name: user['name'] };
}

  useEffect(() => {
    const token = localStorage.getItem('token');
    verify_user(token).then(({ id, name }) => {
        setId(id);
    });
}, []);

  return (
    <>
      <Navbar currentPage="home" />
      <div className="homeScreen">

        <div className="asside metasAlcancadas">
          <t3 className="asside_title">Metas Alcançadas</t3>
          <div className="asside_content">
              <LastGoalsList id={id}/>
          </div>
        </div>
        <div className="asside">
          <t3 className="asside_title">Atualizações de amigos</t3>
          <div className="asside_content">
              <PostsFeeds id={id}/>
          </div>
        </div>
        <div className="asside metasPendentes">
          <t3 className="asside_title">Metas Pendentes</t3>
          <div className="asside_content">
            <IncomingGoalsList id={id}/>
          </div>
        </div>
      </div>
      <Navbar />
      <Footer />
    </>
  );
};

export default Homepage;
