import React from 'react';
import { useState,useEffect } from 'react'
import { getAllGoals } from '../../services/api_requests'
import { verify } from '../../utils/token_verify.js';
import Navbar from '../../components/navbar'
import Spinner from 'react-bootstrap/Spinner';

function Goals (){
  const [loaded, setLoaded] = useState(false)
  const [goals,setGoals] = useState([])
  const [id, setId] = useState()

  async function verify_user(token){
    const token_id = await verify(token)
    const url = new URL(window.location.href);
    if(url.href.includes(token_id)){
      console.log('token válido')
    }else{
      console.log('usuário não condiz com a url informada')
      window.location.href = `/`;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    verify_user(token)
  }, []);

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
        : <div>
          <Spinner animation="grow" size="sm" variant="secondary"/>
        </div>
        
        }
			</div>
  );
}

export default Goals;