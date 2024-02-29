import React, { useEffect, useState } from 'react';
import { login } from '../services/api_requests';

function LoginComponent() {
    const [surname, setsurname] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState('');
    const [primeiraVez, setPrimeiraVez] = useState(true);
    const [loading, setloading] = useState(false);

    const surnameChange = (e) => {
        setsurname(e.target.value);
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
    }

    async function login_user(event) {
        setloading(true);
        event.preventDefault();
        const user_json = {
            "surname": surname,
            "password": password
        };
        const response = await login(user_json);
        console.log(response);
        if (response.message === "user is already logged in") {
            setMessage("usuário já se encontra logado");
            setPrimeiraVez(false);
            setloading(false);
        } else if (response.message === "login not found: wrong password or surname" || response === false) {
            setMessage("login Incorreto, por favor, verifique sua senha ou seu nickname");
            setPrimeiraVez(false);
            setloading(false);
        } else if (response.message === "user logged in successfully") {
            setMessage("logado com sucesso"); //adicionar aqui um redirect para a página home
            setloading(false);
        } else {
            setMessage("erro inexperado");
            setPrimeiraVez(false);
            setloading(false);
        }
    }

    const [telaMaiorCelular, setTelaMaiorCelular] = useState(window.innerWidth > 1000);

    useEffect(() => {
      const verificarTamanhoDaTela = () => {
        setTelaMaiorCelular(window.innerWidth > 1000);
      };

      window.addEventListener('resize', verificarTamanhoDaTela);

      return () => {
        window.removeEventListener('resize', verificarTamanhoDaTela);
      };
    }, []);


    return (
        <div>
            {loading && (
                <div className='loading'>
                    <div fluid className='loadingRodar'>
                    </div>
                </div>
            )}
            {primeiraVez && (
                <form className='LoginForm' onSubmit={login_user}>
                    <h1 className='textos'>Faça o Login em sua Conta</h1>
                    <div className='registroLogin'>
                        <input
                            className='textos'
                            type="text"
                            required="required"
                            onChange={surnameChange}
                            id="surname"
                            placeholder="Informe o E-mail ou nome de usuário"
                        />
                    </div>
                    {!telaMaiorCelular &&(
                        <div className='registroSenha'>
                            <input
                                className='textos'
                                type="password"
                                required="required"
                                onChange={passwordChange}
                                id="password"
                                placeholder="informe a sua senha"
                            />
                            <a className='textos esqueciSenha'>Esqueceu a senha?</a>
                        </div>
                    )}
                    {telaMaiorCelular &&(
                        <div className='registroSenha'>
                            <input
                                className='textos'
                                type="password"
                                required="required"
                                onChange={passwordChange}
                                onFocus={() => capivaraOlhos(true)}
                                onBlur={() => capivaraOlhos(false)}
                                id="password"
                                placeholder="informe a sua senha"
                            />
                            <a className='textos esqueciSenha'>Esqueceu a senha?</a>
                        </div>
                    )}
                    {telaMaiorCelular &&(
                        <button className='textos botaoLogar' type="submit" value="entar">Entrar</button>
                    )}
                    {!telaMaiorCelular &&(
                        <div className='coletaneaBotoesLogar'>
                            <button className='textos botaoLogar' type="submit" value="entar">Entrar</button>
                            <a className='textos botaoLogar botaoCriarUsuario' onClick={() => primeiraVezAtualizar(true)} href="#registro">Criar Usuário</a>
                        </div>
                    )}
                </form>
            )}
            {!primeiraVez && (
                <form className='LoginForm' onSubmit={login_user}>
                    <h1 className='textos'>Faça o Login em sua Conta</h1>
                    <div className='registroLogin'>
                        <input
                            className='textos'
                            type="text"
                            required="required"
                            onChange={surnameChange}
                            id="surname"
                            placeholder="Informe o E-mail ou nome de usuário"
                        />
                    </div>
                    {!telaMaiorCelular &&(
                        <div className='registroSenha'>
                            <input
                                className='textos'
                                type="password"
                                required="required"
                                onChange={passwordChange}
                                id="password"
                                placeholder="informe a sua senha"
                            />
                            <a className='textos esqueciSenha'>Esqueceu a senha?</a>
                        </div>
                    )}
                    {telaMaiorCelular &&(
                        <div className='registroSenha'>
                            <input
                                className='textos'
                                type="password"
                                required="required"
                                onChange={passwordChange}
                                onFocus={() => capivaraOlhos(true)}
                                onBlur={() => capivaraOlhos(false)}
                                id="password"
                                placeholder="informe a sua senha"
                            />
                            <a className='textos esqueciSenha'>Esqueceu a senha?</a>
                        </div>
                    )}
                    {telaMaiorCelular &&(
                        <button className='textos botaoLogar' type="submit" value="entar">Entrar</button>
                    )}
                    {!telaMaiorCelular &&(
                        <div className='coletaneaBotoesLogar'>
                            <button className='textos botaoLogar' type="submit" value="entar">Entrar</button>
                            <a className='textos botaoLogar botaoCriarUsuario' onClick={() => primeiraVezAtualizar(true)} href="#registro">Criar Usuário</a>
                        </div>
                    )}
                    {message ? <div className='textos alertaLogin'>{message}</div> : ''}
                </form>
            )}
        </div>
    )
}

export default LoginComponent;
