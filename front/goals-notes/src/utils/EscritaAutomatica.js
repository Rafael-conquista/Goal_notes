import { useEffect, useState } from "react";

export function EscritaAutomatica(props){
    const [text, setText] = useState("");
    const tempo = props.props.tempo;

    const Escrever = (text, i = 0) => {
        if(i < text.length){
            setText(text.slice(0, i + 1) + "|");
            setTimeout(() => Escrever(text, i + 1), tempo);
        } else {
            setText(text.slice(0, i + 1));
        }
    };

    useEffect(() => {
        setText(""); // Limpa o texto antes de iniciar a escrita
        setTimeout(() => Escrever(props.props.text), 500); // Inicia a escrita após 500ms
    }, [props.props.text]); // O efeito é acionado sempre que props.props.text mudar

    return(
        <>
            {text}
        </>
    );        
}
