export async function get_user(id){
    try{
      let response = await fetch(`http://127.0.0.1:5000/user/${id}`)
      let user = await response.json()
      return user
    } catch(e){
      console.log(e)
    }
  }

  export async function update_user(data){
    try{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "email": data.email,
        "surname": data.surname,
        "password": data.password
      });
    
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
    
      let response = await fetch("http://127.0.0.1:5000/user/1", requestOptions)
      return response.json()
    } catch(e){
        console.log(e)
      return false
    }
  }