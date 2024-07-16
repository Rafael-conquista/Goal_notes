import React, { useEffect, useState } from "react";
import { token_storage } from "../utils/token_verify";
import { token_verify } from "../services/api_requests.js";
import { remove_token } from "../utils/token_verify.js";
import { login } from "../services/api_requests";
import { Modal } from "react-bootstrap";
import { update_user } from "../services/user_requests.js";
import Loading from "./loading.js";

function LoginComponent() {
  const [id, set_id] = useState();
  const [email, setEmail] = useState();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");
  const [primeiraVez, setPrimeiraVez] = useState(true);
  const [loading, setloading] = useState(false);

  async function verify(token) {
    try {
      const response = await token_verify(token);
      const id = response.id;
      if (id) {
        //quando tivermos a página inicial, passar o id para a url
        window.location.href = `${id}/goals`;
      } else {
        console.log("é necessário realizar o login");
        remove_token();
      }
    } catch {
      console.log("validation error");
    }
  }

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const capivaraOlhos = (focus) => {
    const olhos = document.getElementById("cap");
    if (focus) {
      olhos.classList.add("fecha");
    } else {
      olhos.classList.remove("fecha");
    }
  };

  const primeiraVezAtualizar = (event) => {
    setPrimeiraVez(true);
  };
  async function active_user() {
    const user_json = {
      excluir: false,
    };
    const response = await update_user(user_json, id);
  }

  async function login_user(event) {
    setloading(true);
    event.preventDefault();
    const user_json = {
      email: email,
      password: password,
    };
    const response = await login(user_json);
    if (response.message === "user is already logged in") {
      setMessage("usuário já se encontra logado");
      setPrimeiraVez(false);
      setloading(false);
    } else if (
      response.message === "login not found: wrong password or email" ||
      response === false
    ) {
      setMessage(
        "login Incorreto, por favor, verifique sua senha ou seu nickname"
      );
      setPrimeiraVez(false);
      setloading(false);
    } else if (response.message === "user logged in successfully") {
      setMessage("logado com sucesso");
      token_storage(response.token);
      setloading(false);
      verify(response.token);
    } else if (response.message === "this user is deleted") {
      setMessage("Usuário deletado");
      set_id(response.id);
      handleModal();
      setloading(false);
    } else {
      setMessage("erro inexperado");
      setPrimeiraVez(false);
      setloading(false);
    }
  }

  const handleModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {loading && <Loading />}
      {primeiraVez && (
        <form className="LoginForm" onSubmit={login_user}>
          <h1 className="textos">Acesse sua conta</h1>
          <input
            className="textos"
            type="email"
            required="required"
            onChange={emailChange}
            id="email"
            placeholder="Informe o E-mail"
          />

          <input
            className="textos"
            type="password"
            required="required"
            onChange={passwordChange}
            id="password"
            placeholder="informe a sua senha"
          />

          <button className="textos esqueciSenha">Esqueceu a senha?</button>

          <button className="textos botaoLogar" type="submit" value="entar">
            Entrar
          </button>
        </form>
      )}
      {!primeiraVez && (
        <form className="LoginForm" onSubmit={login_user}>
          <h1 className="textos">Acesse sua conta</h1>
          <input
            className="textos"
            type="email"
            required="required"
            onChange={emailChange}
            id="email"
            placeholder="Informe o E-mail"
          />

          <input
            className="textos"
            type="password"
            required="required"
            onChange={passwordChange}
            id="password"
            placeholder="informe a sua senha"
          />

          <button className="textos esqueciSenha">Esqueceu a senha?</button>

          <button className="textos botaoLogar" type="submit" value="entar">
            Entrar
          </button>
          {message ? <div className="textos alertaLogin">{message}</div> : ""}
        </form>
      )}
      <Modal show={showModal} onHide={handleClose} centered size="xl">
        <Modal.Header>
          <div className="form_grid">
            Este usuário foi deletado, deseja reativa-lo?
            <p>realize o login novamente após realizar a reativação!</p>
          </div>
        </Modal.Header>
        <Modal.Footer className="modal_footer">
          <div className="buttons">
            <div className="botao close" onClick={handleClose}>
              <span>Não</span>
            </div>
            <div
              className="botao"
              onClick={() => {
                active_user();
                handleClose();
              }}
            >
              <span>Sim, por favor...</span>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginComponent;
