import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "../../components/Style/homeStyle.css";

const Homepage = () => {
  return (
    <>
      <Navbar currentPage="home" />
      <div className="homeScreen">
        <div className="asside">
          <t3 className="asside_title">Atualizações de amigos</t3>
          <div className="asside_content"></div>
        </div>
        <div className="asside metasAlcancadas">
          <t3 className="asside_title">Metas Alcançadas</t3>
          <div className="asside_content"></div>
        </div>
        <div className="asside">
          <t3 className="asside_title">Metas Pendentes</t3>
          <div className="asside_content"></div>
        </div>
      </div>
      <Navbar />
      <Footer />
    </>
  );
};

export default Homepage;
