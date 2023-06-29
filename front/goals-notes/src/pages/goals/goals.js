import React from 'react';
import { useState } from 'react'
import { getAllGoals } from '../../services/api_requests'
import Navbar from '../../components/navbar'

function Goals (){
  const [loaded, setLoaded] = useState(false)
  const [goals,setGoals] = useState([])
  async function getGoals(){
    const dados = await getAllGoals()
    setGoals(dados)
    setLoaded(true)
  }
  return (
    <div>
      <Navbar/>
				<p>clique para ver todos as metas já criadas:</p>
				<button onClick={getGoals} >CLICK</button>
        {loaded ? 
          <div>
            <div>
              {
                goals.map((goal,key) =>{
                  return(
                    <div key={key}>
                      <hr></hr>
                      <p>id: {goal.id}</p>
                      <p>name: {goal.name}</p>
                      <p>importance_degree: {goal.importance_degree}</p>
                      <p>initial_date: {goal.initial_date}</p>
                      <p>expected_date: {goal.expected_date}</p>
                      <p>end_date: {goal.end_date}</p>
                      <p>type_name: {goal.type_name}</p>
                      <p>user_id: {goal.user_id}</p>
                      <p>obs: {goal.obs}</p>
                      <p>current_progress:{goal.current_progress}</p>
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