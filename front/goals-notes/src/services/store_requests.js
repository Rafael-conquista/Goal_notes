export async function getSkins(){
  try{
    let response = await fetch(`http://127.0.0.1:5000/skins`)
    let user = await response.json()
    return user
  } catch(e){
    console.log(e)
  }
}
