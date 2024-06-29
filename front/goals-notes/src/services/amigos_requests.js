export async function getAmigosUser(id, ultimos) {
  if(ultimos == true) {
    try {
      let response = await fetch(`http://127.0.0.1:5000/AmigosUser/${id}`);
      let result = await response.json();
      return result.amigos.slice(0, 3);
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  else {
    try {
      let response = await fetch(`http://127.0.0.1:5000/AmigosUser/${id}`);
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
  
    let response = await fetch(`http://127.0.0.1:5000/Amigos_registro`, requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}

export async function getAmigosUserPendente(id) {
  try {
    let response = await fetch(`http://127.0.0.1:5000/AmigosUserPendente/${id}`);
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
  
    let response = await fetch(`http://127.0.0.1:5000/AmigoAceitarSolicitacao`, requestOptions)
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
  
    let response = await fetch(`http://127.0.0.1:5000/AmigoNegarSolicitacao`, requestOptions)
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
  
    let response = await fetch(`http://127.0.0.1:5000/Amigo_desfazer`, requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}