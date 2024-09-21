import React, { useState, useEffect } from 'react';
import { getAllFinishedGoals } from '../services/goals_request';
import { UpdateGoal } from '../services/goals_request';
import { redirect } from 'react-router-dom';

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
            window.location.href = `#goals_end`;
        }
        if (empty === false) {
            window.location.href = `#titulo_goals`;
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
            <button onClick={buttonHandle} class="Btn_goal_add new_goal_button Btn_goal_end">
            {empty ? ('Ver metas já finalizadas!'):('Ocultar metas já finalizadas')}
                <span className="button__icon">
                    <img height="80%" className='bi bi-cart2 img_goal' src="https://img.icons8.com/windows/32/view.png" alt="add--v1"></img>
                </span>
            </button>
            <div id='goals_end' className='goals_grid'>
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
                                <h5 className='goal_obs'>{goal.obs}</h5>
                                <div className='goal_data'>
                                    <p><span>Início:</span> {new Date(goal.initial_data).toLocaleDateString('pt-BR')}</p>
                                    <p><span>Expectativa:</span> {new Date(goal.expected_data).toLocaleDateString('pt-BR')}</p>
                                    <p><span>Tipo:</span> {goal.type_name}</p>
                                    <p><span>Ciclos de Pomodoro: </span> {goal.pomodoro_cycles}</p>
                                    {goal.end_date ? <p><span>Finalizada em:</span> {new Date(goal.end_date).toLocaleDateString('pt-BR')}</p> : ''}
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