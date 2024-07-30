import React, { useState } from "react";
import { token_storage } from "../utils/token_verify";
import { register } from "../services/api_requests";
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

  const emailChange = (e) => setEmail(e.target.value);
  const surnameChange = (e) => setSurname(e.target.value);
  const passwordChange = (e) => setPassword(e.target.value);
  const confirmChange = (e) => setConfirm(e.target.value);
  const ageChange = (e) => setAge(e.target.value);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      setMessage("Usuário criado com sucesso");
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
        className="textos formRegistroUsuario_input"
          type="email"
          required="required"
          onChange={emailChange}
          id="email"
          placeholder="E-mail"
        />
        <input
          className="textos formRegistroUsuario_input"
          type="text"
          required="required"
          onChange={surnameChange}
          id="surname"
          placeholder="Informe o usuário"
        />
        <input
          className="textos formRegistroUsuario_input"
          type="date"
          required="required"
          onChange={ageChange}
          id="age"
          placeholder="Data de nascimento"
        />
        <input
          className="textos formRegistroUsuario_input"
          type="password"
          required="required"
          onChange={passwordChange}
          id="password"
          placeholder="Insira sua Senha"
        />
        <input
          className="textos formRegistroUsuario_input"
          type="password"
          id="confirm_password"
          required="required"
          onChange={confirmChange}
          placeholder="Confirme a Senha"
        />
        <button className="textos botaoRegistrar" type="submit">
          Registrar
        </button>
        <p
          className="textos esqueciSenha redirect"
          onClick={scrollToTop} 
        >
          Já possui uma conta? Realize agora seu login!
        </p>
        {!primeiraVez && !sucesso && (
          <div className="alertaRegistro">{message}</div>
        )}
        {!primeiraVez && sucesso && (
          <div className="alertaRegistroSucesso">{message}</div>
        )}
      </form>
    </>
  );
}

export default RegisterComponent;
