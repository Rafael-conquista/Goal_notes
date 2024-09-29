import React, { useState, useEffect } from 'react';
import './Style/userStyle.css';
import cap_default from '../images/cap_default.jpeg';
import barbie from '../images/barbie.png'
import batman from '../images/batman.jpg'
import casaco from '../images/casaco.jpg'
import dark from '../images/dark.jpg'
import dragon from '../images/dragon.jpg'
import esquilo from '../images/esquilo.jpg'
import fantasia from '../images/fantasia.jpg'
import gatinho from '../images/gatinho.jpg'
import kratos from '../images/kratos.jpg'
import luigi from '../images/luigi.jpg'
import mario from '../images/mario.jpg'
import megaman from '../images/megaman.jpg'
import menina from '../images/menina.jpg'
import draculaura from '../images/draculaura.jpg'
import mine from '../images/mine.jpg'
import sonic from '../images/sonic.jpg'
import souls from '../images/souls.jpg'
import stiche from '../images/stiche.jpg'
import yoshi from '../images/yoshi.jpg'
import charizard from '../images/charizard.jpg'
import cap_doom from '../images/capDoom.jpeg';
import cap_link from '../images/capLink.jpeg';
import cap_wizard from '../images/capWizard.jpeg';
import cap_percy from '../images/capPercy.jpeg';
import cap_witcher from '../images/capWitcher.jpeg';
import { getItensActive } from '../services/store_user_requests.js';
import { escolherSkin } from '../services/store_user_requests.js';
import Loading from './loading.js';

function AmigoFotoComponent({ id, perfil, alterando, idCap, toast }) {
  const [idImage, setIdImage] = useState();
  const [enumBackGround, setEnumBackGround] = useState();
  const [idStore, setIdStore] = useState(idCap);
  const [consultaPerfil, setConsultaPerfil] = useState(perfil);
  const [editar, setEditar] = useState(alterando);
	const [loading, setLoading] = useState(false);

  function update_fetched_skins() {
    if (!sessionStorage.getItem('fetched_skins')) {
      sessionStorage.setItem('fetched_skins', JSON.stringify({ id: idImage }));
    } else {
      const fetchedSkins = JSON.parse(sessionStorage.getItem('fetched_skins'));
      fetchedSkins[id] = idImage;
      sessionStorage.setItem('fetched_skins', JSON.stringify(fetchedSkins));
    }
  }

  function update_fetched_background() {
    if (!sessionStorage.getItem('fetched_background')) {
      sessionStorage.setItem('fetched_background', JSON.stringify({ id: enumBackGround }));
    } else {
      const fetchedSkins = JSON.parse(sessionStorage.getItem('fetched_background'));
      fetchedSkins[id] = enumBackGround;
      sessionStorage.setItem('fetched_background', JSON.stringify(fetchedSkins));
    }
  }

  // useEffect(() => {
  //   getItensActive(id, 2).then((image) => {
  //     if (image.skins.length > 0 && !idCap) {
  //       const result = image.skins[0]
  //       setEnumBackGround(result.enum)
  //     }
  //   });
  // })

  useEffect(() => {
    if (!sessionStorage.getItem('fetched_background')) {
      getItensActive(id, 2).then((image) => {
        if (image.skins.length > 0 && !idCap) {
          const result = image.skins[0]
          setEnumBackGround(result.enum)
          update_fetched_background()
        }
      });
  } else {
      const teste = JSON.parse(sessionStorage.getItem('fetched_background'));
      if (teste[`${id}`]) {
        setEnumBackGround(teste[`${id}`])
      } else {
        getItensActive(id, 2).then((image) => {
          if (image.skins.length > 0 && !idCap) {
            const result = image.skins[0]
            setEnumBackGround(result.enum)
            update_fetched_background()
          }
        });
      }
    }
  }, [enumBackGround]);

  useEffect(() => {
    if (!sessionStorage.getItem('fetched_skins')) {
      getItensActive(id, 1).then((image) => {
      if (image.skins.length > 0 && !idCap) {
        const result = image.skins[0]
        setIdImage(result.enum)
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
        getItensActive(id, 1).then((image) => {
          if (image.skins.length > 0 && !idCap) {
            const result = image.skins[0]
            setIdImage(result.enum)
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
          case 6:
            return barbie;
          case 7:
            return batman;
          case 8:
            return casaco
          case 9:
            return dark
          case 10:
            return draculaura
          case 11:
            return dragon
          case 12:
            return esquilo
          case 13:
            return fantasia
          case 14:
            return gatinho
          case 15:
            return kratos
          case 16:
            return luigi
          case 17:
            return mario
          case 18:
            return megaman
          case 19:
            return menina
          case 20:
            return mine
          case 21:
            return sonic
          case 22:
            return souls
          case 23:
            return stiche
          case 24:
            return yoshi
          case 25:
            return charizard
          default:
            return cap_default;
        }
      };
        
    async function escolherCap() {
		  setLoading(true)
      if (id != 0) {
        const response = await escolherSkin(idCap, false, 1)
        if (response === 'Alterado'){
    			sessionStorage.removeItem('fetched_skins');
          window.location.reload()
		      setLoading(false)
        }
      }
      else if (id == 0) {
        const response = await escolherSkin(idStore, true, 1)
        if (response === 'Alterado'){
    			sessionStorage.removeItem('fetched_skins');
          window.location.reload()
		      setLoading(false)
        }
      }
    }
    
    return (
      <>
		    {loading && <Loading/>}
        {!consultaPerfil && !editar && !toast &&
          <a className='consultar_amigo' href={`/${id}/Perfil`}>
            <img src={getImageSrc(idImage)} alt='vazio' className={`cap_welcome_page cap_welcome_page_amigo background_img_hover_${enumBackGround}`}/>
          </a>
        } 
        {consultaPerfil && !editar &&
          <img src={getImageSrc(idImage)} alt='vazio' className='cap_welcome_page'/>
        }
        {toast && !editar &&
          <img src={getImageSrc(idImage)} alt='vazio' className={`background_img_${enumBackGround}`} style={{ width: '60px', height: '60px', marginRight: '10px' }}/>
        }
        {consultaPerfil && editar && !idStore &&
          <img src={getImageSrc(idImage)} alt='vazio' className={`cap_welcome_page cap_welcome_page_amigo background_img_hover_${enumBackGround}`}/>
        }
        {consultaPerfil && editar && idStore &&
          <img onClick={() => escolherCap()} src={getImageSrc(id)} alt='vazio' className='espacamento cap_welcome_page cap_welcome_page_amigo'/>
        }
      </>
    );
}


export default AmigoFotoComponent;
