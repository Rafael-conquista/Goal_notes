import React, { useState, useEffect } from 'react';
import './Style/loading.css';
import { getImage } from '../services/store_user_requests.js';
import AmigoFotoComponent from '../components/amigoFoto.js';

const UsuarioFoto = ({ idToken }) => {
	const [skin, setSkin] = useState([]);
	const [vez, setVez] = useState(false);

	useEffect(() => {
		getImage(idToken).then((skins) => {
			if (!vez) {
			  setSkin(skins.skins);
			  setVez(true);
			}
	  	})
	}, [skin]);

	async function alerta() {
        window.location.reload()
    }

	return (
	  <div className='loading'>
		<div className='clicar' onClick={() => alerta()}></div>
		<div className='consulta_skins'>
			<h1>Aqui estão todas as suas skins</h1>
			<div className='consulta_skins_images'>
				{skin.length > 0 ? skin.map((skinsUsuario) => (
				  <AmigoFotoComponent id={skinsUsuario.id_store} perfil={true} alterando={true} idCap={skinsUsuario.id} />
				)) : <p>Você ainda não tem skins, tente comprar algumas na loja.</p>}
			</div>
		</div>
	  </div>
	);
  }
  
  export default UsuarioFoto;