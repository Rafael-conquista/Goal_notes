export async function get_user(id){
    try{
      let response = await fetch(`http://127.0.0.1:5000/user/${id}`)
      let user = await response.json()
      return user
    } catch(e){
      console.log(e)
    }
  }