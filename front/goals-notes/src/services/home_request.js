export async function getAllGoals(id){
    try{
      let response = await fetch(`http://127.0.0.1:5000/usergoals/${id}`)
      let goalsData = await response.json()
      return goalsData
    } catch(e){
      console.log(e)
    }
  }


  export async function createGoal(data){
    try{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      console.log(data.name)
      var raw = JSON.stringify({
        "name": data.name,
        "obs": data.obs,
        "importance_degree": data.priority,
        "user_id": data.user_id,
        "type_id": data.type,
        "expected_data": data.days
      });
    
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
    
      let response = await fetch("http://127.0.0.1:5000/goal/2", requestOptions)
      return response.json()
    } catch(e){
        console.log(e)
      return false
    }
  }