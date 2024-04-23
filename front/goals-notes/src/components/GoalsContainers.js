import { useState, useEffect } from 'react';
import GoalCreator from './goalCreator';
import './Style/goals_container.css'

function GoalsContainer({ goals, id }) {
    const [empty, setEmpty] = useState(true);

    useEffect(() => {
        if (Object.keys(goals).length > 0) {
            setEmpty(false);
        }
    }, [goals]);

    // Converte o objeto de metas em um array de metas
    const goalsArray = Object.values(goals);

    return (
        <div className='goals_view' style={{ overflowX: 'hidden' }}>
            <GoalCreator id={id}/>
            <div>
                {empty ?
                    <div>
                        Você ainda não possui nenhuma meta cadastrada! Mas não seja por isso, crie uma agora mesmo!
                    </div>
                    :
                    goalsArray.map((goal, key) => {
                        return (
                            <div key={key}>
                                <hr></hr>
                                <p>name: {goal.name}</p>
                                <p>importance_degree: {goal.importance_degree}</p>
                                <p>initial_data: {goal.initial_data}</p>
                                <p>expected_data: {goal.expected_data}</p>
                                <p>end_date: {goal.end_date}</p>
                                <p>type_name: {goal.type_name}</p>
                                <p>obs: {goal.obs}</p>
                                <p>current_progress: {goal.current_progress}</p>
                                <hr></hr>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GoalsContainer;
