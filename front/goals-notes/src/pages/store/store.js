import React, { useState, useEffect } from 'react';
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
    }
  };
  
  const possuiSkin = (idStore) => {
    return skinPossue.some(skin => skin.id_store === idStore);
  };

  return (
    <>
      <Navbar currentPage="Store" />
      <section className='capScreen homeScreen'>
        <div className="amigo_main_ultimos store_component_cima">
          {skin.length > 0 ? skin.map((store) => (
            !possuiSkin(store.id) ? (
                  <div class="card_store">
                    <div class="image_store">
                      <span class="text_store"><img className='img_store' src={getImageSrc(store.id)}></img></span>
                    </div>
                    <span class="price">¢{store.price}</span>
                    <div className='campoCompra_store'>
                      <button onClick={() => comprarSkin(store.price, store.id)} type="button" class="button_perfil_store button_perfil">
                        <span class="button__text">Comprar</span>
                        <span class="button__icon"><svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path></svg></span>
                      </button>
                    </div>
                  </div>
            ) : (
                  <div class="card_store">
                    <div class="image_store">
                      <span class="text_store"><img className='img_store' src={getImageSrc(store.id)}></img></span>
                    </div>
                    <div className='campoCompra_store_comprada campoCompra_store'>
                      <button type="button" class="button_perfil_store_comprada">
                        <span class="button__text button_text">Comprada</span>
                      </button>
                    </div>
                  </div>
            )
          )) : <p>Ainda não está sendo vendido nada.</p>}
        </div>
      </section>
    </>
  );
}

export default Store;
