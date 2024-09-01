import get_api_url from "../config";

const apiUrl = get_api_url()

export async function getItensActive(id, type){
  try{
    var myHeaders = new Headers();
    myHeaders.append('ngrok-skip-browser-warning', 'true')
    let response = await fetch(apiUrl+`Itens_by_user_active/${id}/${type}`, {headers: myHeaders})
    let user = await response.json()
    return user
  } catch(e){
    console.log(e)
  }
}

export async function getImage(id){
  try{
    let response = await fetch(apiUrl+`Itens_by_user/${id}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',  // Adiciona o cabeçalho personalizado
      }
    })
    let user = await response.json()
    return user
  } catch(e){
  }
}

export async function postCompra(preco, capcoins, idUsuario, idStore){
  try{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('ngrok-skip-browser-warning', 'true')
    
    var raw = JSON.stringify({
      "preco": preco,
      "capcoins": capcoins,
      "idUsuario": idUsuario,
      "idStore": idStore 
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    let response = await fetch(apiUrl+`itens_register_by_user`, requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}
export async function escolherSkin(idSkin, validacao, type){
    if(validacao == true){
      try{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('ngrok-skip-browser-warning', 'true')
        
        var raw = JSON.stringify({
          "idSkin": idSkin,
          "validacao": validacao,
          "type": type
        });
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
      
        let response = await fetch(apiUrl+`active_iten_user`, requestOptions)
        return response.json()
      } catch(e){
          console.log(e)
        return false
      }
    }
    else if(validacao == false){
      try{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('ngrok-skip-browser-warning', 'true')
        
        var raw = JSON.stringify({
          "idSkin": idSkin,
          "validacao": validacao,
          "type": type
        });
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
      
        let response = await fetch(apiUrl+`active_iten_user`, requestOptions)
        return response.json()
      } catch(e){
          console.log(e)
        return false
      }
    }
    
}