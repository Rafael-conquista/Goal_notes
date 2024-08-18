import get_api_url from "../config";

const apiUrl = get_api_url()

export async function getSkins(){
  try{
    let response = await fetch(apiUrl+`skins`,{
      headers: {
        'ngrok-skip-browser-warning': 'true',  // Adiciona o cabeçalho personalizado
      }
    })
    let user = await response.json()
    return user
  } catch(e){
    console.log(e)
  }
}
