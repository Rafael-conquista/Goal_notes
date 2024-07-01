import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import cap_default from '../../images/cap_default.jpg';
import user_default from '../../images/user.webp';
import '../../components/Style/homeStyle.css';
import '../../components/Style/perfil.css';

const Store = () => {
  const [amigosGeral, setAmigosGeral] = useState(false);

  const consultarAmigos = (e) => {
    setAmigosGeral(true);
  }
  const desconsultarAmigos = (e) => {
    setAmigosGeral(false);
  }

  return (
    <div>
      <Navbar currentPage="Store" />
      <div className='capScreen homeScreen'>
        <div className="cap_component_perfil">
        </div>
      </div>
    </div>
  );
}

export default Store;
