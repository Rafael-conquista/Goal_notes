import { useState, useEffect } from 'react';
import GoalCreator from './goalCreator';
import './Style/goals_container.css'

function GoalsContainer({ goals, id, mayUpdate, setMayUpdate }) {
    const [empty, setEmpty] = useState(true);

    useEffect(() => {
        if (Object.keys(goals).length > 0) {
            setEmpty(false);
        }
        console.log("atualizei ")
    }, [goals]);

    // Converte o objeto de metas em um array de metas
    const goalsArray = Object.values(goals);

    return (
        <div className='goals_view' style={{ overflowX: 'hidden' }}>
            <GoalCreator id={id} mayUpdate={mayUpdate} setMayUpdate={setMayUpdate}/>
            <div>
                {empty ?
                    <div>
                        Você ainda não possui nenhuma meta cadastrada! Mas não seja por isso, crie uma agora mesmo!
                    </div>
                    :
                    goalsArray.map((goal, key) => {
                        return (
                            <div key={key} className='goal_card'>
                                <div className='goal_title'>
                                    <input type='checkbox'/>
                                    <p>{goal.name}</p>
                                    <p>{goal.importance_degree}★</p>
                                </div>
                                
                                <p>current_progress: {goal.current_progress}%</p>
                                <p>{goal.obs}</p>
                                <p>initial_data: {goal.initial_data}</p>
                                <p>expectativa de finalização: {goal.expected_data}</p>
                                <p>type_name: {goal.type_name}</p>
                                <p>data de finalização: {goal.end_date} aparecer somente se já foi finalizada</p>
                                <div className='edit_button'>
                                    Clique para visualizar sua meta completa ou para edita-la
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GoalsContainer;
