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

function AmigoFotoComponent({ id, perfil, alterando, idCap, toast }) {
  const [idImage, setIdImage] = useState();
  const [idStore, setIdStore] = useState(idCap);
  const [consultaPerfil, setConsultaPerfil] = useState(perfil);
  const [editar, setEditar] = useState();


  function update_fetched_skins() {
    if (!sessionStorage.getItem('fetched_skins')) {
      sessionStorage.setItem('fetched_skins', JSON.stringify({ id: idImage }));
    } else {
      const fetchedSkins = JSON.parse(sessionStorage.getItem('fetched_skins'));
      fetchedSkins[id] = idImage;
      sessionStorage.setItem('fetched_skins', JSON.stringify(fetchedSkins));
    }
  }

  useEffect(() => {
    if (!sessionStorage.getItem('fetched_skins')) {
      getImageActive(id).then((image) => {
        if (image.skins.length > 0 && !idCap) {
          const result = image.skins[0]
          setIdImage(result.id_store)
          update_fetched_skins()
        }
        if (idCap) {
          setIdImage(id)
          update_fetched_skins()
        }
      })
    } else {
      const teste = JSON.parse(sessionStorage.getItem('fetched_skins'));
      if (teste[`${id}`]) {
        setIdImage(teste[`${id}`])
      } else {
        getImageActive(id).then((image) => {
          if (image.skins.length > 0 && !idCap) {
            const result = image.skins[0]
            setIdImage(result.id_store)
            update_fetched_skins()
          }
          if (idCap) {
            setIdImage(id)
            update_fetched_skins()
          }
        })
      }
    }

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
      if (response === 'Alterado') {
        window.location.reload()
      }
    }
    else if (id == 0) {
      const response = await escolherSkin(idStore, true)
      if (response === 'Alterado') {
        window.location.reload()
      }
    }
  }

  return (
    <>
      {!consultaPerfil && !editar && !toast &&
        <a className='consultar_amigo' href={`/${id}/Perfil`}>
          <img src={getImageSrc(idImage)} alt='vazio' className='cap_welcome_page cap_welcome_page_amigo' />
        </a>
      }
      {consultaPerfil && !editar &&
        <img src={getImageSrc(idImage)} alt='vazio' className='cap_welcome_page' />
      }
      {toast && !editar &&
        <img src={getImageSrc(idImage)} alt='vazio' style={{ width: '60px', height: '60px', marginRight: '10px' }} />
      }
      {consultaPerfil && editar && !idStore &&
        <img src={getImageSrc(idImage)} alt='vazio' className='cap_welcome_page cap_welcome_page_amigo' />
      }
      {consultaPerfil && editar && idStore &&
        <img onClick={() => escolherCap()} src={getImageSrc(idImage)} alt='vazio' className='espacamento cap_welcome_page cap_welcome_page_amigo' />
      }
    </>
  );
}

export default AmigoFotoComponent;
