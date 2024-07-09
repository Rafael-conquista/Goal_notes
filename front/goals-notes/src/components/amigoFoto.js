import React, { useState, useEffect } from 'react';
import './Style/userStyle.css';
import cap_default from '../images/cap_default.jpg';
import cap_doom from '../images/capDoom.png';
import cap_link from '../images/capLink.png';
import cap_wizard from '../images/capWizard.png';
import cap_percy from '../images/capPercy.png';
import cap_witcher from '../images/capWitcher.png';
import { getImageActive } from '../services/store_user_requests.js';
import { escolherSkin } from '../services/store_user_requests.js';

function AmigoFotoComponent({ id, perfil, alterando, idCap }) {
  const [idImage, setIdImage] = useState();
  const [idStore, setIdStore] = useState(idCap);
  const [consultaPerfil, setConsultaPerfil] = useState(perfil);
  const [editar, setEditar] = useState(alterando);

    useEffect(() => {
      getImageActive(id).then((image) => {
        if (image.skins.length > 0 && !idCap) {
          const result = image.skins[0]
          setIdImage(result.id_store)
        }
        if (idCap) {
          setIdImage(id)
        }
      })
    }, [idImage]);

    const getImageSrc = (idImage) => {
        switch (idImage) {
          case 0:
            return cap_default;
          case 1:
            return cap_doom;
          case 2:
            return cap_link;
          case 3:
            return cap_wizard;
          case 4:
            return cap_percy;
          case 5:
            return cap_witcher;
          default:
            return cap_default;
        }
      };

    async function escolherCap() {
      if (id != 0) {
        const response = await escolherSkin(idCap, false)
        if (response === 'Alterado'){
          window.location.reload()
        }
      }
      else if (id == 0) {
        const response = await escolherSkin(idStore, true)
        if (response === 'Alterado'){
          window.location.reload()
        }
      }
    }
    
    return (
      <>
        {!consultaPerfil && !editar &&
          <a className='consultar_amigo' href={`/${id}/Perfil`}>
            <img src={getImageSrc(idImage)} alt='vazio' className='cap_welcome_page cap_welcome_page_amigo'/>
          </a>
        } 
        {consultaPerfil && !editar &&
          <img src={getImageSrc(idImage)} alt='vazio' className='cap_welcome_page'/>
        }
        {consultaPerfil && editar && !idStore &&
          <img src={getImageSrc(idImage)} alt='vazio' className='cap_welcome_page cap_welcome_page_amigo'/>
        }
        {consultaPerfil && editar && idStore &&
          <img onClick={() => escolherCap()} src={getImageSrc(idImage)} alt='vazio' className='espacamento cap_welcome_page cap_welcome_page_amigo'/>
        }
      </>
    );
}

export default AmigoFotoComponent;
