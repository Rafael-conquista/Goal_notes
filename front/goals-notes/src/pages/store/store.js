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
import { atualizaPreco } from '../../services/store_user_requests.js';
import CapMessage from '../../components/CapMessages';
import Footer from "../../components/footer";

const Store = () => {

  const [skin, setSkin] = useState([]);
  const [skinPossue, setSkinPossue] = useState([]);
  const [vez, setVez] = useState(false);
  const [idToken, setIdToken] = useState()
  const { id } = useParams();
  const [capcoins, setcapcoins] = useState()
  const [admin, setAdmin] = useState(false)
  const [editarPrecos, setEditarPrecos] = useState(false)
  const [preco, setPreco] = useState()
  const [novopreco, setNovoPreco] = useState()
  const [idstoreAltera, setIdStoreAltera] = useState()
  

  const novoPrecoChange = (e) => {
    setNovoPreco(e.target.value);
  };

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
    setcapcoins(user.capcoins) 
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

  async function get_admin(id){
    const user = await get_user(id);
    setAdmin(user.admin) 
  }

  useEffect(() => {
    if (!vez) {
      get_admin(id)
      setVez(true)
    }
  })

  async function comprarSkin(preco, idStore) {
    if (preco <= capcoins) {
      const response = await postCompra(preco, capcoins, idToken, idStore);
      setcapcoins(capcoins - preco)
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

  async function alterarPreco(preco, idStore) {
    if (!editarPrecos){
      setNovoPreco(preco)
      setPreco(preco)
      setEditarPrecos(true)
      setIdStoreAltera(idStore)
    }
    else if (editarPrecos) {
      const response = await atualizaPreco(novopreco, idStore);
			window.location.reload()
    }
  };
  
  const possuiSkin = (idStore) => {
    return skinPossue.some(skin => skin.id_store === idStore);
  };

  async function EditarPrecos() {
    if (editarPrecos == true)
      setEditarPrecos(false)
    else 
      setEditarPrecos(true)
  };

	async function alerta() {
    setEditarPrecos(false)
  }

  return (
    <>
      <Navbar currentPage="Store" />
      <section className='capScreen homeScreenStore store'>
        {editarPrecos &&
          <div className='loading'>
		        <div className='clicar' onClick={() => alerta()}></div>
		        <div className='consulta_skins altera_preco_itens'>
              <h2>Editar Preço do item</h2>
              <p>O preço atual do item é <b>{preco}</b> capCoins💰.</p>
              <p>Insira abaixo o novo preço, mas cuidado para não cobrar demais!⚠️</p>
              <input className="textos input_troca_preco" type="number" onChange={novoPrecoChange} id="novoPrecoItem" placeholder='Coloque o preço do item'></input>
              <button className='button_salvar_item' onClick={() => alterarPreco(novopreco, idstoreAltera)}>Salvar</button>
            </div>
	        </div>
        }
        <div className="store_component_cima">
          <h1 className='tituloStore'>Compre algumas skins da Cap</h1>
          <div className="store_item">
            {skin.length > 0 ? skin.map((store) => (
              !possuiSkin(store.id) ? (
                <>
                  { store.type == 1 &&
                      <div className="card_store">
                        <div className="image_store">
                          <span className="text_store"><img className='img_store' src={verifyIten(store.enum, store.type)}></img></span>
                        </div>
                            {admin &&
                            <div onClick={() => alterarPreco(store.price, store.id)} class="tooltip-container">
                              <span class="tooltip">Editar preço</span>
                              <svg viewBox="0 0 512 512" class="svg_button botao_editar_preco">
                                  <path class="text" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                              </svg>
                            </div>
                            }
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
                      {admin &&
                      <div onClick={() => alterarPreco(store.price, store.id)} class="tooltip-container">
                        <span class="tooltip">Editar preço</span>
                        <svg viewBox="0 0 512 512" class="svg_button botao_editar_preco">
                            <path class="text" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                        </svg>
                      </div>
                      }
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
          <div className="store_item">
            {skin.length > 0 ? skin.map((store) => (
              !possuiSkin(store.id) ? (
                <>
                  { store.type == 2 &&
                      <div className="card_store">
                        <div className="image_store">
                          <span className="text_store"><div className={`img_store background_${store.enum}`}></div></span>
                        </div>
                          {admin &&
                          <div onClick={() => alterarPreco(store.price, store.id)} class="tooltip-container">
                            <span class="tooltip">Editar preço</span>
                            <svg viewBox="0 0 512 512" class="svg_button botao_editar_preco">
                                <path class="text" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                            </svg>
                          </div>
                          }
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
                      {admin &&
                        <div onClick={() => alterarPreco(store.price, store.id)} class="tooltip-container">
                          <span class="tooltip">Editar preço</span>
                          <svg viewBox="0 0 512 512" class="svg_button botao_editar_preco">
                              <path class="text" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                          </svg>
                        </div>
                      }
                      <div className='campoCompra_store_comprada campoCompra_store'>
                        <button type="button" className="button_perfil_store_comprada">
                          <span className="button__text button_text">Comprada</span>
                        </button>
                      </div>
                    </div>
                  }
                </>
              )
            )) : <p>Ainda não há skins sendo vendidas.</p>}
          </div>
          <CapMessage ref={capMessageRef} message={"Ah não, parece que você não tem capcoins o suficiente."} id_user={id} />
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default Store;
