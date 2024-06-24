import React from 'react';
import Navbar from '../../components/navbar';
import cap_default from '../../images/cap_default.jpg';
import user_default from '../../images/user.webp';
import '../../components/Style/homeStyle.css';
import '../../components/Style/perfil.css';
import UserUpdateComponent from '../../components/userUpdate';
import CapUpdateComponent from '../../components/capUpdate';
import AmigosConsultComponent from '../../components/amigosConsult';

const Homepage = () => {
  return (
    <div>
      <Navbar currentPage="perfil" />
      <div className='capScreen homeScreen'>
        <div className="cap_component_perfil">
          <section className='component_cap_main'>
            <CapUpdateComponent/>
            <UserUpdateComponent/>
          </section>
          <AmigosConsultComponent/>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
