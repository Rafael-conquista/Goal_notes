import React, { useState, useEffect } from 'react';
import './Style/loading.css';
import { getImage } from '../services/store_user_requests.js';
import AmigoFotoComponent from '../components/amigoFoto.js';
import { escolherSkin } from '../services/store_user_requests.js';
import Loading from './loading.js';

const UsuarioFoto = ({ idToken, onClose }) => {
  const [skin, setSkin] = useState([]);
  const [vez, setVez] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getImage(idToken).then((skins) => {
      if (!vez) {
        setSkin(skins.skins);
        setVez(true);
        setLoading(false);
      }
    });
  }, [idToken, vez]);

  async function alerta() {
    window.location.reload();
  }

  async function escolherFundo(id, type) {
    setLoading(true);
    const response = await escolherSkin(id, false, type);
    if (response === 'Alterado') {
      window.location.reload();
      sessionStorage.removeItem('fetched_background');
    }
  }

  async function escolherFundoPadrao(type) {
    setLoading(true);
    const response = await escolherSkin(idToken, true, type);
    if (response === 'Alterado') {
      window.location.reload();
      sessionStorage.removeItem('fetched_background');
    }
  }

  return (
    <div className='loading'>
      {loading && <Loading />}
      <div className='clicar' onClick={() => alerta()}></div>
      <div className='consulta_skins'>
        <h1>Aqui estão as skins compradas</h1>
        <div className='amizades_amigos consulta_skins_images'>
          {skin.length > 0 ? skin.map((skinsUsuario) => (
            <>
              {skinsUsuario.type == 1 &&
                <AmigoFotoComponent id={skinsUsuario.enum} perfil={true} alterando={true} idCap={skinsUsuario.id} type={1} />
              }
            </>
          )) : <p>Você ainda não tem skins compradas, tente comprar algumas na loja.</p>}
        </div>
        <h1>Aqui estão as cores de fundo compradas</h1>
        <div className='amizades_amigos consulta_skins_images'>
          {skin.length > 0 ? skin.map((skinsUsuario) => (
            <>
              {skinsUsuario.type == 2 &&
                <span onClick={() => escolherFundo(skinsUsuario.id, skinsUsuario.type)} className="espacamento text_store">
                  <div className={`img_perfil img_store background_${skinsUsuario.enum}`}></div>
                </span>
              }
            </>
          )) : <p>Você ainda não tem cores de fundo compradas, tente comprar algumas na loja.</p>}
        </div>
        <h1>Aqui estão as skins e cores padrões</h1>
        <div className='amizades_amigos consulta_skins_images'>
          <AmigoFotoComponent id={0} perfil={true} alterando={true} idCap={idToken} />
          <span onClick={() => escolherFundoPadrao(2)} className="espacamento text_store">
            <div className={`img_perfil img_store background_0`}></div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UsuarioFoto;
