export async function getAllGoals(){
    let response = await fetch('http://127.0.0.1:5000/goals')
    let goalsData = await response.json()
    const dados = goalsData.goals
    return dados
  }

export async function register(data){
  var raw = JSON.stringify({
    "name": "teste1",
    "surname": "refac",
    "password": "123"
  });
  
  var requestOptions = {
    method: 'POST',
    body: raw,
  };
  
  fetch("http://127.0.0.1:5000/register", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}