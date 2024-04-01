export async function getAllGoals(){
  try{
    let response = await fetch('http://127.0.0.1:5000/goals')
    let goalsData = await response.json()
    const dados = goalsData.goals
    return dados
  } catch(e){
    console.log(e)
  }
}

export async function register(data){
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
  
    let response = await fetch("http://127.0.0.1:5000/register", requestOptions)
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
  
    let response = await fetch("http://127.0.0.1:5000/login", requestOptions)
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

    let response = await fetch(`http://127.0.0.1:5000/verify_token`, requestOptions)
    return response.json()
  } catch (e) {
    console.log(e)
    return false
  }
}