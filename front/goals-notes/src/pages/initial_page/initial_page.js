import React, { useEffect, useState } from "react";
import LoginComponent from "../../components/login.js";
import RegisterComponent from "../../components/register.js";
import "../../components/Style/loginStyle.css";
import { token_verify } from "../../services/api_requests.js";
import { remove_token } from "../../utils/token_verify.js";
import Modal from "../../components/modal/index.js"; /* importar a Modal */
import { Button } from "react-bootstrap";
const Initial = () => {

  const [openModal,setOpenModal] = useState(false) /* Funcionamento da Modal  */



  async function verify(token) {
    try {
      const response = await token_verify(token);
      const id = response.id;
      if (sessionStorage.getItem("first_acess")) {
        window.location.href = `/CapCreate`;
      } else if (id) {
        window.location.href = `${id}/goals`;
      } else {
        console.log("é necessário realizar o login");
        remove_token();
      }
    } catch {
      console.log("validation error");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verify(token);
    }
  }, []);

  return (
    <section className="sectionLoginForm">
      <img
        className="logoCapivara capivaraOlha"
        src="/content/capivaraSemOlhos.png"
        alt="capivaraSemOlhos"
      />
      <div id="cap" className="eyes">
        <div className="eye" id="leftEye" />
      </div>
      <div></div>
      <div className="login-wrapper">
        <div id="login" className="cardLogin grid">
          <LoginComponent />
        </div>
        <div id="registro" className="cardRegister grid">
          <RegisterComponent />
        </div>
      </div>
      <button onClick={() => setOpenModal(true)}>Abir Modal</button>{/* Botao da Modal  */}
      <Modal isOpen={openModal} setOpenModal={() => setOpenModal(!openModal)}/> {/* importar a modal  */}
    </section>
    
  );
};

export default Initial;
