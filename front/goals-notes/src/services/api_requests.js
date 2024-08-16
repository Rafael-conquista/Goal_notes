import get_api_url from "../config";

const apiUrl = get_api_url()

export async function register(data){
  console.log(apiUrl)
  try{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "email": data.email,
      "name": data.name,
      "age": data.age,
      "surname": data.surname,
      "password": data.password
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    let response = await fetch(apiUrl+"register", requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}

export async function login(data){
  try{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "email": data.email,
      "password": data.password
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    let response = await fetch(apiUrl+"login", requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}

export async function token_verify(token) {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "token": token,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let response = await fetch(apiUrl+`verify_token`, requestOptions)
    return response.json()
  } catch (e) {
    console.log(e)
    return false
  }
}

export async function register_cap(data, id){
  try{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "id_user": id,
      "name": data.name
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    let response = await fetch(apiUrl + "cap_register", requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}

export async function getAllTypes(){
  try{
    let response = await fetch(apiUrl+`types`)
    let types= await response.json()
    return types
  } catch(e){
    console.log(e)
  }
}

export async function getPosts(id){
  try{
    let response = await fetch(apiUrl+`posts/${id}`)
    let posts = await response.json()
    return posts
  } catch(e){
    console.log(e)
  }
}