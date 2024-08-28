import React, { useState } from "react";
import { register } from "../services/api_requests";
import { token_storage } from "../utils/token_verify";
import Loading from "./loading.js";

function RegisterComponent() {
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [surname, setSurname] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(false);
  const [primeiraVez, setPrimeiraVez] = useState(true);
  const [sucesso, setSucesso] = useState(false);

  const emailChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const surnameChange = (e) => {
    setSurname(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  const confirmChange = (e) => {
    setConfirm(e.target.value);
  };
  const ageChange = (e) => {
    setAge(e.target.value);
  };

  async function register_user(event) {
    setloading(true);
    event.preventDefault();
    if (password !== confirm) {
      setMessage("Sua senha e sua confirmação de senha não coincidem");
      setPrimeiraVez(false);
      setloading(false);
      return;
    }
    const user_json = {
      email: email,
      name: surname,
      age: age,
      surname: surname,
      password: password,
    };
    const response = await register(user_json);
    console.log(response);
    if (response.message === "the user has been created") {
      setMessage("usuário criado com sucesso");
      setSucesso(true);
      setPrimeiraVez(false);
      setloading(false);
      token_storage(response.token);

      sessionStorage.setItem("first_acess", true);
      window.location.href = "/capCreate";
    } else {
      setMessage("Ocorreu um erro durante a criação do usuário");
      setPrimeiraVez(false);
      setloading(false);
    }
  }

  document.addEventListener("mousemove", function (e) {
    const eyes = document.querySelectorAll(".eye");
    eyes.forEach((eye) => {
      const bounds = eye.getBoundingClientRect();
      const x = bounds.left + bounds.width / 2;
      const y = bounds.top + bounds.height / 2;
      const radianAngle = Math.atan2(e.clientY - y, e.clientX - x);
      const angle = radianAngle * (180 / Math.PI);
      const distance = Math.min(Math.hypot(e.clientX - x, e.clientY - y), 12);
      eye.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(${distance}px)`;
    });
  });


  return (
    <>
      {loading && <Loading />}
      <div>
        <h1 className="textos">Novo Aqui?</h1>
        <h2 className="textos">
          Cadastre-se agora para poder organizar sua rotina e ter uma amiga
          "capivarinha" para te acompanhar nessa jornada!
        </h2>
      </div>
      <form className="formRegistroUsuario" onSubmit={register_user}>
        <input
          type="email"
          required="required"
          onChange={emailChange}
          id="email"
          placeholder="E-mail"
        />

        <input
          className="textos"
          type="text"
          required="required"
          onChange={surnameChange}
          id="surname"
          placeholder="Informe o usuário"
        />

        <input
          className="textos"
          type="date"
          required="required"
          onChange={ageChange}
          id="age"
          placeholder="Data de nascimento"
        />

        <input
          className="textos"
          type="password"
          required="required"
          onChange={passwordChange}
          id="password"
          placeholder="Insira sua Senha"
        />
        <input
          className="textos"
          type="password"
          id="confirm_password"
          required="required"
          onChange={confirmChange}
          placeholder="Confirme a Senha"
        />

        <button className="textos botaoRegistrar" type="submit" value="entar">
          Registrar
        </button>
        {!primeiraVez &&
          !sucesso &&
          (message ? <div className="alertaRegistro">{message}</div> : "")}
        {!primeiraVez &&
          sucesso &&
          (message ? (
            <div className="alertaRegistroSucesso">{message}</div>
          ) : (
            ""
          ))}
      </form>
    </>
  );
}

export default RegisterComponent;
