export async function getImageActive(id){
  try{
    let response = await fetch(`http://127.0.0.1:5000/Itens_by_user_active/${id}`)
    let user = await response.json()
    return user
  } catch(e){
  }
}

export async function getImage(id){
  try{
    let response = await fetch(`http://127.0.0.1:5000/Itens_by_user/${id}`)
    let user = await response.json()
    return user
  } catch(e){
  }
}

export async function postCompra(preco, capCoins, idUsuario, idStore){
  try{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "preco": preco,
      "capCoins": capCoins,
      "idUsuario": idUsuario,
      "idStore": idStore 
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    let response = await fetch(`http://127.0.0.1:5000/itens_register_by_user`, requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}
export async function escolherSkin(idSkin){
  try{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "idSkin": idSkin
    });
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    let response = await fetch(`http://127.0.0.1:5000/active_iten_user`, requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}