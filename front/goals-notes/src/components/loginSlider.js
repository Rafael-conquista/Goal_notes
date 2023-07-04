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
                        <div class='card grid'>
                            <div onClick={displayLoginHandler} class='button quadrado2'>
                                <p>botão</p>
                            </div>
                            <div class='form-login'>
                                <RegisterComponent />
                            </div>
                        </div>
                    </>
                    :
                    <div class='card grid'>
                        <div class='form-register'>
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