import React, { useState, useEffect, useRef } from 'react';
import './Style/conquista.css';
import './Style/goals_container.css';
import cap_amiga_um from '../images/capivaraAmigaUm.png';
import cap_amiga_dez from '../images/capivaraAmigaDez.png';
import cap_tarefa_um from '../images/capivaraTarefaUm.png';
import cap_tarefa_dez from '../images/capivaraTarefaDez.png';
import cap_tarefa_vinte from '../images/capivaraTarefaVinte.png';
import cap_tarefa_trinta from '../images/capivaraTarefaTrinta.png';

function Conquista({ idImage, name }) {

    const getImageSrc = (idImage) => {
        console.log(idImage)
        switch (idImage) {
          case 0:
            return cap_amiga_um;
          case 1:
            return cap_tarefa_um;
          case 2:
            return cap_amiga_um;
          case 3:
            return cap_amiga_dez;
          case 4:
            return cap_tarefa_dez;
          case 5:
            return cap_tarefa_vinte;
          case 6:
            return cap_tarefa_trinta;
          default:
            return cap_amiga_um;
        }
      };

    return (
        <div className='conquista'>
          <img src={getImageSrc(idImage)} alt='vazio' className='cap_welcome_page'/>
          <div className='text_conquista'>
            <h2>Você conquistou</h2>
            <p>{name}</p>
          </div>
        </div>            
    );
}

export default Conquista;
