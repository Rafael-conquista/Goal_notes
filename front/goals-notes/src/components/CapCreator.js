import React, { useState, useEffect } from 'react';
import cap_default from '../images/cap_default.jpg';
import { EscritaAutomatica } from '../utils/EscritaAutomatica';

function CapCreatorComponent(){
    const first_interaction = [
        {tempo: 45, text:"Olá! 🌟 Bem-vindo ao meu cantinho virtual, Sou a Cap!"}, 
        {tempo: 45, text:"Estou pronta para compartilhar sorrisos e alegria contigo. 🌿✨"},
        {tempo: 45, text:"Antes de começarmos nossa conversa, poderia me dizer como devo chama-lo? 😊👋"},
        {tempo: 45, text:"Que nome Lindo!"},
        {tempo: 45, text:"Adoraria ter um nome que combine comigo! 😊 "},
        {tempo: 45, text:"Como você gostaria de me chamar? Estou ansiosa para saber! 💖🌸"}
    ]
    
    const [showInput, setShowInput] = useState(false)
    const [showTextInput, setShowTextInput] = useState(false)
    const [message, setMessage] = useState(first_interaction[0])
    const [interaction, setInteraction] = useState(1)
    const [nickname, setNickname] = useState()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setShowInput(true);
        }, 3900);
    
        return () => clearTimeout(timeoutId);
      }, [showInput])

      const handleInput = () => {
        if(showInput){
            setShowInput(false)
            setInteraction(interaction+1)
            setMessage(first_interaction[interaction])
        }

        if(interaction === 2){
            setShowTextInput(true)
        } 
        if(interaction === 5){
            setShowTextInput(true)
        } 
      }

      const nicnameChange = (e) => {
        setNickname(e.target.value)
        if (e.key === "Enter") {
            setShowTextInput(false)
            handleInput()
        }
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
                    {showInput && !showTextInput &&<button onClick={handleInput}>Clique para continuar</button>}
                    {showTextInput && <input type='text' placeholder='Digite como deseja ser chamado!' onChange={nicnameChange} onKeyPress={nicnameChange}/>}
                </div>
            </div>
        </>
    )
}

export default CapCreatorComponent;