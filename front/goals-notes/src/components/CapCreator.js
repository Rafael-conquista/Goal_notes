import React, { useState, useEffect } from 'react';
import cap_default from '../images/cap_default.jpg';
import { EscritaAutomatica } from '../utils/EscritaAutomatica';
import { update_user } from '../services/user_requests';
import { register_cap } from '../services/api_requests';
import { verify } from '../utils/token_verify';

function CapCreatorComponent(){
    const first_interaction = [
        {tempo: 25, text:"Olá! 🌟 Bem-vindo ao meu cantinho virtual, Sou a Cap!"}, 
        {tempo: 25, text:"Estou pronta para compartilhar sorrisos e alegria contigo. 🌿✨"},
        {tempo: 25, text:"Antes de começarmos nossa conversa, poderia me dizer como devo chama-lo? 😊👋"},
        {tempo: 25, text:"Que nome Lindo!"},
        {tempo: 25, text:"Adoraria ter um nome que combine comigo! 😊 "},
        {tempo: 25, text:"Como você gostaria de me chamar? Estou ansiosa para saber! 💖🌸"},
        {tempo: 25, text:"Adorei este Apelido!"},
        {tempo: 25, text:`Perfeito! Prometo que não irei esquecer!` }
    ]
    
    const [id, setId] = useState()
    const [showInput, setShowInput] = useState(false)
    const [noInput, setNoInput] = useState(false)
    const [showTextInput, setShowTextInput] = useState(false)
    const [showCapInput, setShowCapInput] = useState(false)
    const [confirmNames, setConfirmNames] = useState(false)
    const [message, setMessage] = useState(first_interaction[0])
    const [interaction, setInteraction] = useState(1)
    const [nickname, setNickname] = useState()
    const [capName, setCapName] = useState()

    const confirm_interaction = [
        {tempo: 25, text:`Só para eu decorar, então seu nome é ${nickname} e meu apelido é ${capName} ?` },
        {tempo: 25, text: "Tudo bem, pode me dizer quais são os nomes corretos?"}
    ]

    async function verify_token(){
        const token_id = await verify(localStorage.getItem('token'))
        return token_id
    }

    useEffect(() => {
        const first_acess = sessionStorage.getItem('first_acess')
        if (first_acess) {
            console.log("tem token")
        }
        else {
            console.log('não tem token, redirecionando...');
            window.location.href = '/';
        }
        verify_token().then((id) => {
            setId(id)
        });
    }, [])
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setShowInput(true);
        }, 2400);
    
        return () => clearTimeout(timeoutId);
      }, [showInput])

      const handleInput = () => {
        if(showInput){
            setShowInput(false)
            setShowCapInput(false)
            setInteraction(interaction+1)
            if(interaction>6){
                setMessage(confirm_interaction[0])
                setConfirmNames(true)
            }else{
                setMessage(first_interaction[interaction])
            }
        }

        if(interaction === 2){
            setShowTextInput(true)
        } 
        if(interaction === 5){
            setShowCapInput(true)
        } 
      }

      const nicnameChange = (e) => {
        setNickname(e.target.value)
        if (e.key === "Enter") {
            setShowTextInput(false)
            handleInput()
        }
      }

      const capNameChange = (e) => {
        setCapName(e.target.value)
        if (e.key === "Enter") {
            setShowTextInput(false)
            handleInput()
        }
      }

      const confirmChange = (answer) => {
        if(answer){
            setConfirmNames(false)
            handleInput()
            setNoInput(true)
        }else{
            setShowCapInput(true)
            setShowTextInput(true)
            setConfirmNames(false)
            setMessage(confirm_interaction[1])
            setNoInput(true)
        }
      }

    async function user_update() {
        const user_json = {
            "surname": nickname,
        }
        const cap_json = {
            "name": capName
        }
        const user_response = await update_user(user_json, id);  // Corrigir , pois nao esta sendo usado 
        const cap_response = await register_cap(cap_json, id);   // Corrigir , pois nao esta sendo usado
        sessionStorage.removeItem('first_acess');
        window.location.href = `/${id}/Goals`
    }

    return(
        <>
            <div className="cap_component">
                <div className='cap_txt_box_grid'>
                    <img src={cap_default} alt='vazio' className="cap_welcome_page" />
                    <div className='cap_txt_box'>
                        {}
                        <p>
                            <EscritaAutomatica
                                props={message}
                            />
                        </p>
                    </div>
                    {showInput && !showTextInput && !showCapInput && !confirmNames && !noInput &&<button className='button' onClick={handleInput}><span>Continuar</span></button>}
                    {noInput &&<button className='button' onClick={user_update}><span>Continuar</span></button>}
                    {showTextInput && <input type='text' placeholder='Digite como deseja ser chamado!' onChange={nicnameChange} onKeyPress={nicnameChange}/>}
                    {showCapInput && <input type='text' placeholder='Digite o apelido da cap!' onChange={capNameChange} onKeyPress={capNameChange}/>}
                    {
                        confirmNames && 
                        <div className='confirm_button'>    
                            <div className='margin_confirm'>
                                <button className='button' id='confirm' onClick={() =>{confirmChange(true)}}>
                                    <span>Sim, está tudo correto!</span>
                                </button>
                            </div>
                            <div className='margin_confirm'>
                                <button className='button' id='deny' onClick={() =>{confirmChange(false)}}>
                                    <span>Não, acho que me confundi...</span>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default CapCreatorComponent;