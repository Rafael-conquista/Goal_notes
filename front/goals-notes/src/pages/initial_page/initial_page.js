import React from 'react';

const Initial = () =>{

  var requestOptions = {
  method: 'GET',
  };
  fetch("http://127.0.0.1:5000/goals", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  return (
    <div>
      <h1>Está será a tela inicial</h1>
      <p>
        serei responsável por dar a opção para logar ou registrar
        assim como outras possíveis opções para não logados
      </p>
      <p>dentro desta página, deverá existir componentes para login e se registrar</p>
      <p>pensar em uma forma de forçar a pessoa só conseguir acessar outras páginas se estiver logado</p>
    </div>
  );
}

export default Initial;