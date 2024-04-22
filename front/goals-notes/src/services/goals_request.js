export async function getAllGoals(id){
    try{
      let response = await fetch(`http://127.0.0.1:5000/usergoals/${id}`)
      let goalsData = await response.json()
      return goalsData
    } catch(e){
      console.log(e)
    }
  }