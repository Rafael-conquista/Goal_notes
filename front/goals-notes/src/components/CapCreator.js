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
        {tempo: 45, text:"Como você gostaria de me chamar? Estou ansiosa para saber! 💖🌸"},
        {tempo: 45, text:"Adorei este Apelido!"},
        {tempo: 45, text:`Perfeito! Prometo que não irei esquecer!` }
    ]
    
    const [showInput, setShowInput] = useState(false)
    const [showTextInput, setShowTextInput] = useState(false)
    const [showCapInput, setShowCapInput] = useState(false)
    const [confirmNames, setConfirmNames] = useState(false)
    const [message, setMessage] = useState(first_interaction[0])
    const [interaction, setInteraction] = useState(1)
    const [nickname, setNickname] = useState()
    const [capName, setCapName] = useState()

    const confirm_interaction = [
        {tempo: 45, text:`Só para eu decorar, então seu nome é ${nickname} e meu apelido é ${capName} ?` },
        {tempo: 45, text: "Tudo bem, pode me dizer quais são os nomes corretos?"}
    ]

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setShowInput(true);
        }, 3900);
    
        return () => clearTimeout(timeoutId);
      }, [showInput])

      const handleInput = () => {
        if(showInput){
            setShowInput(false)
            setShowCapInput(false)
            setInteraction(interaction+1)
            if(interaction===6){
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

      const confirmChange = (e) => {
        if(e.target.id === "confirm"){
            setConfirmNames(false)
            handleInput()
        }else{
            setShowCapInput(true)
            setShowTextInput(true)
            setConfirmNames(false)
            setMessage(confirm_interaction[1])
            //adicionar redirect para outra página
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
                    {showInput && !showTextInput && !showCapInput && !confirmNames &&<button onClick={handleInput}>Clique para continuar</button>}
                    {showTextInput && <input type='text' placeholder='Digite como deseja ser chamado!' onChange={nicnameChange} onKeyPress={nicnameChange}/>}
                    {showCapInput && <input type='text' placeholder='Digite o apelido da cap!' onChange={capNameChange} onKeyPress={capNameChange}/>}
                    {
                        confirmNames && 
                        <div>
                            <button id='confirm' onClick={confirmChange}>
                                Sim, está tudo correto!
                            </button>
                            <button id='deny' onClick={confirmChange}>
                                Não, acho que me confundi...
                            </button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default CapCreatorComponent;