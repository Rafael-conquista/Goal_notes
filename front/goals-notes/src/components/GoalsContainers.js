import { useState, useEffect } from 'react';
import GoalCreator from './goalCreator';
import './Style/goals_container.css'
import { Modal } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";
import Dropdown from 'react-bootstrap/Dropdown';
import { UpdateGoal } from '../services/goals_request';

function GoalsContainer({ goals, id, mayUpdate, setMayUpdate, types }) {
    const [empty, setEmpty] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [goalClicked, setGoalClicked] = useState()
    const [name, setName] = useState('');
    const [obs, setObs] = useState('');
    const [priority, setPriority] = useState(1);
    const [type, setType] = useState(1);
    const [days, setDays] = useState(30);

    useEffect(() => {
        if (Object.keys(goals).length > 0) {
            setEmpty(false);
        }
    }, [goals, goalClicked]);

    const goalsArray = Object.values(goals);

    const handleModal = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const importance_degree_set = (value) => {
        setPriority(value)
    }

    const renderedTypes = types.types.map((item) => {
        return (
            <Dropdown.Item onClick={() => {
                setType(item.id)
            }}><p>{item.name}</p></Dropdown.Item>
        );
    });

    async function verify_and_save_goal() {
        const goal_json = {
            "name": name,
            "obs": obs,
            "importance_degree": Number(priority),
            "user_id": Number(id),
            "type_id": Number(type),
            "expected_data": days,
        };
        await UpdateGoal(goal_json, goalClicked.goals_id)
        setGoalClicked()
        setName()
        setDays()
        setObs()
        setPriority()
        setType()
        setMayUpdate(true)
    }

    async function deactivate_task(end_date = false, goals_id) {
        const goal_json = {
            "end_date": end_date
        };
        await UpdateGoal(goal_json, goals_id)
        setMayUpdate(true)
    }


    return (
        <div className='goals_view' style={{ overflowX: 'hidden' }}>
            {!goalClicked ? <div>
                <GoalCreator id={id} mayUpdate={mayUpdate} setMayUpdate={setMayUpdate} types={types} />
                <div>
                    {empty ?
                        <div>
                            Você ainda não possui nenhuma meta cadastrada! Mas não seja por isso, crie uma agora mesmo!
                        </div>
                        :
                        goalsArray.map((goal, key) => {
                            return (
                                <div key={key} className='goal_card'>
                                    <div onClick={() => {
                                        if (!goal.end_date) {
                                            setGoalClicked(goal)
                                        }
                                    }}>
                                        <div className='goal_title'>
                                            <p>{goal.name}</p>
                                            <p>{goal.importance_degree}★</p>
                                        </div>

                                        <p>current_progress: {goal.current_progress}%</p>
                                        <p>{goal.obs}</p>
                                        <p>initial_data: {goal.initial_data}</p>
                                        <p>expectativa de finalização: {goal.expected_data}</p>
                                        <p>type_name: {goal.type_name}</p>
                                        <p>data de finalização: {goal.end_date}</p>
                                    </div>
                                    {goal.end_date ?
                                        <div className='botao' onClick={() => {
                                            deactivate_task(false, goal.goals_id)
                                        }}>
                                            <span>Reativar tarefa</span>
                                        </div>
                                        :
                                        <div className='botao' onClick={() => {
                                            deactivate_task(true, goal.goals_id)
                                        }}>
                                            <span>Finalizar tarefa</span>
                                        </div>
                                    }

                                </div>
                            )
                        })
                    }
                </div>
            </div>
                : <div className='goal_card'>
                    <div>
                        <div className='goal_title'>
                            {goalClicked.name}
                        </div>
                        <p>Nome da meta:</p>
                        <input type='text' placeholder={goalClicked.name} maxLength={100} onChange={(e) => {
                            setName(e.target.value)
                        }} />
                        <div>
                            <p>{goalClicked.importance_degree}★</p>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Grau de prioridade
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => {
                                        setPriority(1)
                                    }}>1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        setPriority(2)
                                    }}>2</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        setPriority(3)
                                    }}>3</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        setPriority(4)
                                    }}>4</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        setPriority(5)
                                    }}>5</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div>
                            <p>observação</p>
                            <input type='text' placeholder={goalClicked.obs} maxLength={200} onChange={(e) => {
                                setObs(e.target.value)
                            }} />
                        </div>
                        <p></p>
                        <p>expectativa de finalização: <input type='number' placeholder='Tempo para concluir em dias' onChange={(e) => {
                            setDays(e.target.value)
                        }} /></p>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Qual é a categoria?
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {renderedTypes}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className='buttons'>
                            <div className='botao close' onClick={() => {
                                setGoalClicked()
                            }}>
                                <span>Fechar</span>
                            </div>
                            <div className='botao' onClick={verify_and_save_goal}>
                                <span>Salvar</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default GoalsContainer;
