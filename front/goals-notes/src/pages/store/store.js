import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import cap_default from '../../images/cap_default.jpg';
import user_default from '../../images/user.webp';
import '../../components/Style/homeStyle.css';
import '../../components/Style/perfil.css';

const Store = () => {

  return (
    <>
      <Navbar currentPage="Store" />
      <section className='capScreen homeScreen'>
        <div className="cap_component_perfil">
        </div>
        <div className="cap_component_perfil">
        </div>
      </section>
    </>
  );
}

export default Store;
