import React from 'react';
import { useState, useEffect } from 'react'
var goals = []

function Goals (){
  const [loaded, setLoaded] = useState(false)
  async function getGoals(){
    goals = []
    let response = await fetch('http://127.0.0.1:5000/goals')
    let goalsData = await response.json()
    const dados = goalsData.goals
    dados.forEach(element => {
      goals.push(element)
    });
    console.log(goals)
    setLoaded(true)
  }
  return (
    <div>
				<p>clique para ver todos as metas já criadas:</p>
				<button onClick={getGoals} >CLICK</button>
        {loaded ? 
          <div>
            <div>
              {
                goals.map((goal,key) =>{
                  return(
                    <div>
                      <hr></hr>
                      <p>{goal.id}</p>
                      <p>{goal.name}</p>
                      <p>{goal.importance_degree}</p>
                      <p>{goal.initial_date}</p>
                      <p>{goal.expected_date}</p>
                      <p>{goal.end_date}</p>
                      <p>{goal.type_name}</p>
                      <p>{goal.user_id}</p>
                      <p>{goal.obs}</p>
                      <p>{goal.current_progress}</p>
                      <hr></hr>
                    </div>
                  )
                })
              }
            </div>
          </div>
        : <p>carregando...</p>}
			</div>
  );
}

export default Goals;