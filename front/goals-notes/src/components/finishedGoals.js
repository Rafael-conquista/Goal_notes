import React, { useState, useEffect } from 'react';
import { getAllFinishedGoals } from '../services/goals_request';
import { UpdateGoal } from '../services/goals_request';

function FinishedGoals({ id, mayUpdate, setMayUpdate }) {

    const [goals, setGoals] = useState({});
    const [empty, setEmpty] = useState(true);

    useEffect(() => {
        getFinishedGoals()
    }, [mayUpdate]);

    async function getFinishedGoals() {
        await getAllFinishedGoals(id).then((goals) => {
            setGoals(goals)
        })
    }

    const buttonHandle = () => {
        if (empty === true) {
            getFinishedGoals()
        }
        setEmpty(!empty)

    }

    const deactivateTask = async (end_date = false, goals_id) => {
        const goal_json = { end_date };
        await UpdateGoal(goal_json, goals_id);
        getFinishedGoals()
        setMayUpdate(true)
    };

    return (
        <div>
            <div className='new_goal_button' onClick={buttonHandle}>
                Ver metas já finalizadas!
            </div>
            <div className='goals_grid'>
                {empty ? (
                    <div>

                    </div>
                ) : (
                    Object.values(goals).map((goal, key) => (
                        <div key={key} className='goal_card'>

                            <div>
                                <div className='goal_title'>
                                    <h3 className='name'>{goal.name}</h3>
                                    <h4 className='importance'>{goal.importance_degree}★</h4>
                                </div>
                                <div className='goal_data'>
                                    <h5 className='goal_obs'>{goal.obs}</h5>
                                    <p><span>Início:</span> {goal.initial_data}</p>
                                    <p><span>Expectativa:</span> {goal.expected_data}</p>
                                    <p><span>Tipo:</span> {goal.type_name}</p>
                                    <p><span>Ciclos de Pomodoro: </span> {goal.pomodoro_cycles}</p>
                                    {goal.end_date ? <p><span>Finalizada em:</span> {goal.end_date}</p> : ''}
                                </div>

                                <div className='top_left_botao' onClick={() => deactivateTask(false, goal.goals_id)}>
                                    <span>Reativar tarefa</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default FinishedGoals;