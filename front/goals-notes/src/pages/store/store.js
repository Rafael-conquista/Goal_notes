import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/navbar';
import cap_default from '../../images/cap_default.jpg';
import cap_doom from '../../images/capDoom.png';
import cap_link from '../../images/capLink.png';
import cap_wizard from '../../images/capWizard.png';
import cap_percy from '../../images/capPercy.png';
import cap_witcher from '../../images/capWitcher.png';
import '../../components/Style/homeStyle.css';
import '../../components/Style/perfil.css';
import '../../components/Style/store.css';
import { getSkins } from '../../services/store_requests.js';
import { verify } from '../../utils/token_verify.js';
import { get_user } from '../../services/user_requests.js'
import { useParams } from 'react-router-dom';
import { getImage } from '../../services/store_user_requests.js';
import { postCompra } from '../../services/store_user_requests.js';
import CapMessage from '../../components/CapMessages';

const Store = () => {

  const [skin, setSkin] = useState([]);
  const [skinPossue, setSkinPossue] = useState([]);
  const [vez, setVez] = useState(false);
  const [idToken, setIdToken] = useState()
  const { id } = useParams();
  const [capCoins, setCapCoins] = useState()
  
  async function verify_user(token){
    const token_id = await verify(token)
    const url = new URL(window.location.href);

    if (sessionStorage.getItem("first_acess")){
      window.location.href = `/CapCreate`;
    }
    if(url.href.includes(`/${token_id}/`)){
      console.log('token válido')
    }else{
      console.log('usuário não condiz com a url informada')
      window.location.href = `/`;
    }
    const user = await get_user(token_id)
    setCapCoins(user.capCoins) 
    return { id: token_id };
  }

  const capMessageRef = useRef();

  const handleClick = () => {
    capMessageRef.current.triggerToast();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    verify_user(token).then(({ id }) => {
    setIdToken(id)
    });
  }, []);

  useEffect(() => {
    if (!vez) {
      getSkins().then((skins) => {
        const result = skins.skins
        setSkin(result);
      })
      getImage(id).then((image) => {
        const result = image.skins
        setSkinPossue(result)
      })
      setVez(true)
    }
  }, [skin, skinPossue]);

  const verifyIten = (id, type) => {
    if (type == 1) {
      return getImageSrc(id)
    }
    else if (type == 2) {
      return getImageSrc(id)
      // getBackground(id)
    }
  };

  const getImageSrc = (idImage) => {
    switch (idImage) {
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

  async function comprarSkin(preco, idStore) {
    if (preco <= capCoins) {
      const response = await postCompra(preco, capCoins, idToken, idStore);
      setCapCoins(capCoins - preco)
      getSkins().then((skins) => {
        const result = skins.skins
        setSkin(result);
        const myObject = { update_coin: true };
        sessionStorage.setItem('update_coin', JSON.stringify(myObject));
      })
      getImage(id).then((image) => {
        const result = image.skins
        setSkinPossue(result)
      })
      setVez(true)
    }
    else {
      handleClick()
    }
  };
  
  const possuiSkin = (idStore) => {
    return skinPossue.some(skin => skin.id_store === idStore);
  };

  return (
    <>
      <Navbar currentPage="Store" />
      <section className='capScreen homeScreen store'>
        <div className="store_component_cima">
          <h1 className='tituloStore'>Compre algumas skins da Cap</h1>
          <div className="amigo_main_ultimos">
            {skin.length > 0 ? skin.map((store) => (
              !possuiSkin(store.id) ? (
                <>
                  { store.type == 1 &&
                      <div className="card_store">
                        <div className="image_store">
                          <span className="text_store"><img className='img_store' src={verifyIten(store.enum, store.type)}></img></span>
                        </div>
                        <span className="price">¢{store.price}</span>
                        <div className='campoCompra_store'>
                          <button onClick={() => comprarSkin(store.price, store.id)} type="button" className="button_perfil_store button_perfil">
                            <span className="button__text">Comprar</span>
                            <span className="button__icon"><svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path></svg></span>
                          </button>
                        </div>
                      </div>
                  }
                </>
              ) : (
                <>
                  { store.type == 1 &&
                    <div className="card_store">
                      <div className="image_store">
                        <span className="text_store"><img className='img_store' src={verifyIten(store.enum, store.type)}></img></span>
                      </div>
                      <div className='campoCompra_store_comprada campoCompra_store'>
                        <button type="button" className="button_perfil_store_comprada">
                          <span className="button__text button_text">Comprada</span>
                        </button>
                      </div>
                    </div>
                  }
                </>
              )
            )) : <p>Ainda não skins sendo vendidas.</p>}
          </div>
        </div>
        <div className="store_component_baixo">
          <h1 className='tituloStore'>Compre algumas cores de fundo para sua Cap</h1>
          <div className="amigo_main_ultimos">
            {skin.length > 0 ? skin.map((store) => (
              !possuiSkin(store.id) ? (
                <>
                  { store.type == 2 &&
                      <div className="card_store">
                        <div className="image_store">
                          <span className="text_store"><div className={`img_store background_${store.enum}`}></div></span>
                        </div>
                        <span className="price">¢{store.price}</span>
                        <div className='campoCompra_store'>
                          <button onClick={() => comprarSkin(store.price, store.id)} type="button" className="button_perfil_store button_perfil">
                            <span className="button__text">Comprar</span>
                            <span className="button__icon"><svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path></svg></span>
                          </button>
                        </div>
                      </div>
                  }
                </>
              ) : (
                <>
                  { store.type == 2 &&
                    <div className="card_store">
                      <div className="image_store">
                        <span className="text_store"><div className={`img_store background_${store.enum}`}></div></span>
                      </div>
                      <div className='campoCompra_store_comprada campoCompra_store'>
                        <button type="button" className="button_perfil_store_comprada">
                          <span className="button__text button_text">Comprada</span>
                        </button>
                      </div>
                    </div>
                  }
                </>
              )
            )) : <p>Ainda não skins sendo vendidas.</p>}
          </div>
          <CapMessage ref={capMessageRef} message={"Ah não, parece que você não tem CapCoins o suficiente."} id_user={id} />
        </div>
      </section>
    </>
  );
}

export default Store;
