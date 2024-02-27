import React, { useEffect, useState } from 'react';
import { login } from '../services/api_requests';

function LoginComponent() {
    const [surname, setsurname] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState('');
    const [primeiraVez, setPrimeiraVez] = useState(true);

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

    async function login_user(event) {
        event.preventDefault();
        const user_json = {
            "surname": surname,
            "password": password
        };
        const response = await login(user_json);
        console.log(response);
        if (response.message === "user is already logged in") {
            setMessage("usuário já se encontra logado");
        } else if (response.message === "login not found: wrong password or surname" || response === false) {
            setPrimeiraVez(false);
            setMessage("login Incorreto, por favor, verifique sua senha ou seu nickname");
        } else if (response.message === "user logged in successfully") {
            setMessage("logado com sucesso"); //adicionar aqui um redirect para a página home
        } else {
            setMessage("erro inexperado");
        }
    }

    return (
        <div>
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
                    <button className='textos botaoLogar' type="submit" value="entar">Entrar</button>
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
                    <button className='textos botaoLogar' type="submit" value="entar">Entrar</button>
                    {message ? <div className='textos alertaLogin'>{message}</div> : ''}
                </form>
            )}
        </div>
    )
}

export default LoginComponent;
