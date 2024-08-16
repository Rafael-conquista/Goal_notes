import get_api_url from "../config";

const apiUrl = get_api_url()

export async function getImageActive(id){
  try{
    let response = await fetch(apiUrl+`Itens_by_user_active/${id}`)
    let user = await response.json()
    return user
  } catch(e){
  }
}

export async function getImage(id){
  try{
    let response = await fetch(apiUrl+`Itens_by_user/${id}`)
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
  
    let response = await fetch(apiUrl+`itens_register_by_user`, requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}
export async function escolherSkin(idSkin, validacao){
    if(validacao == true){
      try{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "idSkin": idSkin,
          "validacao": validacao
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
        
        var raw = JSON.stringify({
          "idSkin": idSkin,
          "validacao": validacao
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