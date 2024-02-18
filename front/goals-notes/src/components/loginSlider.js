import React from 'react'
import { useState } from 'react'
import RegisterComponent from './register'
import Container from 'react-bootstrap/Container';
import './Style/loginStyle.css'

function LoginSlider() {
    const [displayLogin, setDisplayLogin] = useState(false)
    const displayLoginHandler = () => {
        if (!displayLogin) {
            setDisplayLogin(true)
        } else {
            setDisplayLogin(false)
        }
    }
    return (

        <Container>
            {
                displayLogin ?
                    <>
                        <div class='card grid fade-in'>
                            <div onClick={displayLoginHandler} class='button quadrado2'>
                                <p>botão</p>
                            </div>
                            <div class='form-login fade-in'>
                                <RegisterComponent />
                            </div>
                        </div>
                    </>
                    :
                    <div class='card grid fade-in'>
                        <div class='form-register fade-in'>
                            <RegisterComponent />
                        </div>
                        <div onClick={displayLoginHandler} class='button quadrado'>
                            <p>botão</p>
                        </div>
                    </div>
            }
        </Container>)
}

export default LoginSlider