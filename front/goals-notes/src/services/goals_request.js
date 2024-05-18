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
    var raw = JSON.stringify({
      "name": data.name,
      "obs": data.obs,
      "importance_degree": data.importance_degree,
      "user_id": data.user_id,
      "type_id": data.type_id,
      "expected_data": Number(data.expected_data)
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

export async function UpdateGoal(data, id){
  try{
    var raw
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if("end_date" in data){
      raw = JSON.stringify({
        "end_date": data.end_date
      });
    }else{
      raw = JSON.stringify({
        "name": data.name,
        "obs": data.obs,
        "importance_degree": data.importance_degree,
        "user_id": data.user_id,
        "type_id": data.type_id,
        "expected_data": Number(data.expected_data)
      });

    }
  
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log(raw)
    let response = await fetch(`http://127.0.0.1:5000/goal/${id}`, requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}

export async function registerItems(data, id){
  try{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "desc": data.desc,
      "goals_id": id
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    let response = await fetch("http://127.0.0.1:5000/item_register", requestOptions)
    return response.json()
  } catch(e){
      console.log(e)
    return false
  }
}