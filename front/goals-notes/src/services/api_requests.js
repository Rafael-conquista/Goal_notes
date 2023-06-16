export async function getAllGoals(){
    let response = await fetch('http://127.0.0.1:5000/goals')
    let goalsData = await response.json()
    const dados = goalsData.goals
    return dados
  }