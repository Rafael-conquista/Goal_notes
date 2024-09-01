import get_api_url from "../config";

const apiUrl = get_api_url()

export async function getAmigosUser(id, ultimos) {
  if(ultimos == true) {
    try {
      let response = await fetch(apiUrl+`AmigosUser/${id}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',  // Adiciona o cabeçalho personalizado
        }
      });
      let result = await response.json();
      return result.amigos.slice(0, 3);
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  else {
    try {
      let response = await fetch(apiUrl+`AmigosUser/${id}`,{
        headers: {
          'ngrok-skip-browser-warning': 'true',  // Adiciona o cabeçalho personalizado
        }
      });
      let result = await response.json();
      return result.amigos;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

export async function makeFriend(idUsuario, idAmigo) {
  try{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "user_id": idUsuario,
      "user_friend_id": idAmigo,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    let response = await fetch(apiUrl+`Amigos_registro`, requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}

export async function getAmigosUserPendente(id) {
  try {
    let response = await fetch(apiUrl+`AmigosUserPendente/${id}`,{
      headers: {
        'ngrok-skip-browser-warning': 'true',  // Adiciona o cabeçalho personalizado
      }
    });
    let result = await response.json();
    return result.amigos;
  } catch (e) {
    console.log(e);
    return [];
  }
}


export async function aceitar_amizade(idAmizade) {
  try{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id_amizade": idAmizade,
    });
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    let response = await fetch(apiUrl+`AmigoAceitarSolicitacao`, requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}

export async function negar_amizade(idAmizade) {
  try{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id_amizade": idAmizade,
    });
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    let response = await fetch(apiUrl+`AmigoNegarSolicitacao`, requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}

export async function desfazer_amizade(idAmizade) {
  try{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id_amizade": idAmizade,
    });
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    let response = await fetch(apiUrl+`Amigo_desfazer`, requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}