import get_api_url from "../config";

const apiUrl = get_api_url()

export async function get_cap(id){
    try{
      let response = await fetch(apiUrl+`users_cap/${id}`)
      let user = await response.json()
      return user
    } catch(e){
      console.log(e)
    }
  }

  export async function update_cap(data, id){
    try{
      let response = await fetch(apiUrl+`users_cap/${id}`)
      let user = await response.json()
      try{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "name": data.name
        });
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
            
        let response = await fetch(apiUrl+`cap/${user.id}`, requestOptions)
        return response.json()
      } catch(e){
          console.log(e)
        return false
      }
    } catch(e){
      console.log(e)
    }
  }