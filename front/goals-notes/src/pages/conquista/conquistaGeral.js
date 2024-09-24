import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../../components/footer";
import Navbar from '../../components/navbar.js';
import '../../components/Style/homeStyle.css';
import '../../components/Style/perfil.css';
import '../../components/Style/store.css';
import cap_amiga_um from '../../images/capivaraAmigaUm.png';
import cap_amiga_dez from '../../images/capivaraAmigaDez.png';
import cap_tarefa_um from '../../images/capivaraTarefaUm.png';
import cap_tarefa_dez from '../../images/capivaraTarefaDez.png';
import cap_tarefa_vinte from '../../images/capivaraTarefaVinte.png';
import cap_tarefa_trinta from '../../images/capivaraTarefaTrinta.png';
import { get_user_conquistas, get_conquistas } from "../../services/user_requests";

const ConquistaGeral = () => {
  const { id } = useParams();
  const [conquista, setConquista] = useState([]);
  const [conquistaFinalizada, setConquistaFinalizada] = useState([]);

  async function consultaConquista() {
      try {
          const conquista = await get_conquistas(id);
          setConquista(conquista.conquistas || []);
          console.log(conquista)
          
        } catch {
          setConquista([]);
      }
  }

  useEffect(() => {
    consultaConquista();
  }, []);

  const getImageSrc = (idImage) => {
    console.log(idImage);
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
    <>
      <Navbar currentPage="Store" />
      <section className='capScreen homeScreenStore store'>
        <div className="store_component_cima tela_conquistas">
          <h1 className='tituloStore'>Museu de conquistas</h1>
          <div className="store_item">
            {conquista.length > 0 && conquista.map((conquistaItem) => (
              <>
                {conquistaItem.finalizada === 1 &&
                  <div className='box_shadow_conquistas' key={conquistaItem.id || conquistaItem.enum}>
                    <img src={getImageSrc(conquistaItem.enum)} alt='vazio' className='cap_welcome_page img_conquista' />
                    <div className='text_conquista'>
                      <h2>{conquistaItem.nome}</h2>
                      <p>{conquistaItem.descrisao}</p>
                    </div>
                  </div>
                }
                {conquistaItem.finalizada === 0 &&
                  <div className='box_shadow_conquistas' key={conquistaItem.id || conquistaItem.enum}>
                    <img src={getImageSrc(conquistaItem.enum)} alt='vazio' className='cap_welcome_page img_conquista_pendente' />
                    <div className='text_conquista'>
                      <h2>{conquistaItem.nome}</h2>
                      <p>{conquistaItem.descrisao}</p>
                    </div>
                  </div>
                }
              </>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default ConquistaGeral;
