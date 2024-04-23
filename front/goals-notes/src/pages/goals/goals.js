import React from 'react';
import { useState, useEffect } from 'react'
import { getAllGoals } from '../../services/goals_request.js'
import { verify } from '../../utils/token_verify.js';
import { get_user } from '../../services/user_requests.js'
import Navbar from '../../components/navbar'
import GoalsContainer from '../../components/GoalsContainers.js';
import GoalCreator from '../../components/goalCreator.js';
import Spinner from 'react-bootstrap/Spinner';
import '../../components/Style/goals_container.css'

function Goals (){
  const [loaded, setLoaded] = useState(false)
  const [goals, setGoals] = useState([])
  const [id, setId] = useState()
  const [name, setName] = useState('')

  async function verify_user(token){
    const token_id = await verify(token)
    const url = new URL(window.location.href);
    if(url.href.includes(`/${token_id}/`)){
      console.log('token válido')
    }else{
      console.log('usuário não condiz com a url informada')
      window.location.href = `/`;
    }
    const user = await get_user(token_id)
    return { id: token_id, name: user['name'] };
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    verify_user(token).then(({ id, name }) => {
      setId(id)
      setName(name)
    });
  }, []);

  useEffect(() => {
    if (id) {
      getGoals(id).then((dados) =>{
        setGoals(dados)
        setLoaded(true)
      })
    }
  }, [id]);

  async function getGoals(id){
    const dados = await getAllGoals(id)
    return dados
  }
  //criar um componente de criação de novas metas e estilizar o de listagem
  return (
    <div className='goal_creator_buttons'>
      <Navbar/>
        {loaded ? 
          <GoalsContainer
            goals={goals}
          />
        : <div>
          <Spinner animation="grow" size="sm" variant="secondary"/>
        </div>
        
        }
			</div>
  );
}

export default Goals;