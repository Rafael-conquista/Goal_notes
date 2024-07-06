import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import user_default from '../../images/user.webp';
import cap_doom from '../../images/capDoom.png';
import cap_link from '../../images/capLink.png';
import '../../components/Style/homeStyle.css';
import '../../components/Style/perfil.css';
import '../../components/Style/store.css';

const Store = () => {

  return (
    <>
      <Navbar currentPage="Store" />
      <section className='capScreen homeScreen'>
        <div className="amigo_main_ultimos store_component_cima">
          <div class="card_store">
            <div class="image_store">
              <span class="text_store"><img className='img_store' src={cap_link}></img></span>
            </div>
            <span class="price">¢100</span>
            <div className='campoCompra_store'>
              <button type="button" class="button_perfil_store button_perfil">
                <span class="button__text">Comprar</span>
                <span class="button__icon"><svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path></svg></span>
              </button>
            </div>
          </div>
          <div class="card_store">
            <div class="image_store">
              <span class="text_store"><img className='img_store' src={cap_doom}></img></span>
            </div>
            <span class="price">¢100</span>
            <div className='campoCompra_store'>
              <button type="button" class="button_perfil_store button_perfil">
                <span class="button__text">Comprar</span>
                <span class="button__icon"><svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path></svg></span>
              </button>
            </div>
          </div>
          <div class="card_store">
            <div class="image_store">
              <span class="text_store"><img className='img_store' src={user_default}></img></span>
            </div>
            <span class="price">¢100</span>
            <div className='campoCompra_store'>
              <button type="button" class="button_perfil_store button_perfil">
                <span class="button__text">Comprar</span>
                <span class="button__icon"><svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path></svg></span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Store;
