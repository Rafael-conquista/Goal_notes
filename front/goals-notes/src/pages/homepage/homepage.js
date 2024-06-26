import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import cap_default from '../../images/cap_default.jpg';
import '../../components/Style/homeStyle.css';

const Homepage = () => {
  return (
    <div>
      <Navbar currentPage="home" /> 
      <div className='capScreen homeScreen'>
        <div className="cap_component">
          <div className='chat'>
            <img src={cap_default} alt='vazio' className="cap_welcome_page" />
            <p className='mensagemChat'>Nos meandros serenos desta floresta verdejante, entre os murmúrios dos riachos e o sussurro das folhas ao vento, eu, a capivara, encontro meu refúgio, onde a harmonia e a serenidade se entrelaçam em um chat muito particular, preenchido com as mais puras essências da natureza.</p>
          </div>
        </div>
      </div>
      <Footer/> 
    </div>
  );
}

export default Homepage;
