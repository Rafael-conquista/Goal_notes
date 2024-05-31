import { useState, useEffect } from 'react';
import GoalCreator from './goalCreator';
import ItemCreator from './subItemsCreator';
import './Style/goals_container.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { UpdateGoal, getItemsByGoal, registerItems, updateItems } from '../services/goals_request';

function GoalsContainer({ goals, id, mayUpdate, setMayUpdate, types }) {
    const [empty, setEmpty] = useState(true);
    const [goalClicked, setGoalClicked] = useState();
    const [name, setName] = useState();
    const [obs, setObs] = useState();
    const [priority, setPriority] = useState();
    const [type, setType] = useState();
    const [days, setDays] = useState();
    const [visibleSubtasks, setVisibleSubtasks] = useState(null);
    const [items, setItems] = useState([]);
    const [lastItems, setLastItems] = useState(0);
    const [descriptions, setDescriptions] = useState({});

    useEffect(() => {
        if (Object.keys(goals).length > 0) {
            setEmpty(false);
        }
    }, [goals, goalClicked]);

    const goalsArray = Object.values(goals);

    const renderedTypes = types.types.map((item) => (
        <Dropdown.Item key={item.id} onClick={() => setType(item.id)}>
            <p>{item.name}</p>
        </Dropdown.Item>
    ));

    async function verify_and_save_goal() {
        const goal_json = {
            name: name,
            obs: obs,
            importance_degree: Number(priority),
            user_id: Number(id),
            type_id: Number(type),
            expected_data: days,
        };
        await UpdateGoal(goal_json, goalClicked.goals_id);
        items.forEach(item => {
            updateItems(item)
        });
        for (const id in descriptions) {
            if (descriptions[id] !== '') {
                await registerItems(descriptions[id], goalClicked.goals_id)
            }
        }
        setGoalClicked();
        setName();
        setDays();
        setObs();
        setPriority();
        setType();
        setMayUpdate(true);
        setItems([]);
        setDescriptions({})
    }

    async function deactivate_task(end_date = false, goals_id) {
        const goal_json = { end_date };
        await UpdateGoal(goal_json, goals_id);
        setMayUpdate(true);
    }

    async function request_items(id) {
        const itemsResponse = await getItemsByGoal(id);
        const itemsArray = Object.values(itemsResponse);
        setItems(itemsArray);
        setVisibleSubtasks(visibleSubtasks === id ? null : id);
        setLastItems(id);
    }

    function getItemsGoal(id) {
        try {
            if (lastItems === id) {
                setLastItems();
                setVisibleSubtasks(visibleSubtasks === id ? null : id);
            } else {
                request_items(id);
            }
        } catch (error) {
            console.error('Failed to load items:', error);
            setItems([]);
        }
    }

    function handleInputChange(id, value) {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, desc: value } : item
        );
        setItems(updatedItems);
    }

    return (
        <div className='goals_view' style={{ overflowX: 'hidden' }}>
            {!goalClicked ? (
                <div>
                    <GoalCreator id={id} mayUpdate={mayUpdate} setMayUpdate={setMayUpdate} types={types} />
                    <div>
                        {empty ? (
                            <div>
                                Você ainda não possui nenhuma meta cadastrada! Mas não seja por isso, crie uma agora mesmo!
                            </div>
                        ) : (
                            goalsArray.map((goal, key) => (
                                <div key={key} className='goal_card'>
                                    <div onClick={() => {
                                        if (!goal.end_date) {
                                            setGoalClicked(goal);
                                            request_items(goal.goals_id);
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
                                    {goal.end_date ? (
                                        <div className='botao' onClick={() => deactivate_task(false, goal.goals_id)}>
                                            <span>Reativar tarefa</span>
                                        </div>
                                    ) : (
                                        <div className='botao' onClick={() => deactivate_task(true, goal.goals_id)}>
                                            <span>Finalizar tarefa</span>
                                        </div>
                                    )}
                                    <div className='botao' onClick={() => getItemsGoal(goal.goals_id)}>
                                        Ver subtarefas
                                    </div>
                                    {visibleSubtasks === goal.goals_id && (
                                        <div className='subtasks'>
                                            {items.length > 0 ? (
                                                items.map((item, index) => (
                                                    <div key={index} className='subtask_item'>
                                                        <p>{item.desc}</p>
                                                        <p>{item.ativo ? 'Ativo' : 'Inativo'}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>Nenhuma subtarefa encontrada.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <div className='goal_card'>
                    <div>
                        <div className='goal_title'>
                            {goalClicked.name}
                        </div>
                        <p>Nome da meta:</p>
                        <input type='text' placeholder={goalClicked.name} maxLength={100} onChange={(e) => setName(e.target.value)} />
                        <div>
                            <p>{goalClicked.importance_degree}★</p>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Grau de prioridade
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setPriority(1)}>1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setPriority(2)}>2</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setPriority(3)}>3</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setPriority(4)}>4</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setPriority(5)}>5</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div>
                            <p>Observação</p>
                            <input type='text' placeholder={goalClicked.obs} maxLength={200} onChange={(e) => setObs(e.target.value)} />
                        </div>
                        <p>Expectativa de finalização: <input type='number' placeholder='Tempo para concluir em dias' onChange={(e) => setDays(e.target.value)} /></p>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Qual é a categoria?
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {renderedTypes}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div>
                            Sub-tarefas já criadas:
                        </div>
                        <ul>
                            {items.map((item, index) => (
                                <div key={index} className="item">
                                    <label>
                                        <input
                                            type="text"
                                            value={item.desc}
                                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                                        />
                                    </label>
                                </div>
                            ))}
                        </ul>
                        <ItemCreator descriptions={descriptions} setDescriptions={setDescriptions}/>
                        <div className='buttons'>
                            <div className='botao close' onClick={() => setGoalClicked(null)}>
                                <span>Fechar</span>
                            </div>
                            <div className='botao' onClick={verify_and_save_goal}>
                                <span>Salvar</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GoalsContainer;
