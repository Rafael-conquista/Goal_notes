export async function get_cap(id){
    try{
      let response = await fetch(`http://127.0.0.1:5000/users_cap/${id}`)
      let user = await response.json()
      return user
    } catch(e){
      console.log(e)
    }
  }

  export async function update_cap(data, id){
    try{
      let response = await fetch(`http://127.0.0.1:5000/users_cap/${id}`)
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
            
        let response = await fetch(`http://127.0.0.1:5000/cap/${user.id}`, requestOptions)
        return response.json()
      } catch(e){
          console.log(e)
        return false
      }
    } catch(e){
      console.log(e)
    }
  }