import React, { useState, useEffect, useRef } from 'react';
import GoalCreator from './goalCreator';
import ItemCreator from './subItemsCreator';
import FinishedGoals from './finishedGoals';
import './Style/goals_container.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { UpdateGoal, deleteGoals, deleteItems, getItemsByGoal, registerItems, updateItems } from '../services/goals_request';
import PomodoroModel from './pomodoroModal';
import CapMessage from './CapMessages';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";


function GoalsContainer({ goals, id, mayUpdate, setMayUpdate, types }) {
    const [empty, setEmpty] = useState(true);
    const [goalClicked, setGoalClicked] = useState(null);
    const [goalClickedUpdate, setGoalClickedUpdate] = useState(null);
    const [name, setName] = useState('');
    const [obs, setObs] = useState('');
    const [priority, setPriority] = useState(1);
    const [type, setType] = useState('');
    const [days, setDays] = useState('');
    const [items, setItems] = useState([]);
    const [descriptions, setDescriptions] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        setEmpty(Object.keys(goals).length === 0);
    }, [goals, goalClicked]);

    useEffect(() => {
        if (notificationMessage) {
            handleClick();
        }
    }, [notificationMessage]);

    const capMessageRef = useRef();

    const handleClick = () => {
        if (capMessageRef.current) {
            capMessageRef.current.triggerToast();
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setItems([]);
    };

    const handleOpenModal = async (goal) => {
        setGoalClicked(goal);
        try {
            const itemsResponse = await getItemsByGoal(goal.goals_id);
            const itemsArray = Object.values(itemsResponse);
            setItems(itemsArray);
            setShowModal(true);
        } catch (error) {
            console.error('Failed to load items:', error);
            setItems([]);
        }
    };

    const deactivateTask = async (end_date = false, goals_id) => {
        const goal_json = { end_date };
        await UpdateGoal(goal_json, goals_id);
        setShowModal(false);
        setMayUpdate(true);
        const myObject = { update_coin: true };
        sessionStorage.setItem('update_coin', JSON.stringify(myObject));
    };

    const handleCheckboxChange = async (item) => {
        const updatedItem = { ...item, ativo: !item.ativo };
        await updateItems(updatedItem);
        const updatedItems = items.map(it => (it.id === item.id ? updatedItem : it));
        setItems(updatedItems);
    };

    const handleInputChange = (id, value) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, desc: value } : item
        );
        setItems(updatedItems);
    };

    const verify_and_save_goal = async () => {
        const goal_json = {};
        if (name) {
            goal_json.name = name;
        }
        if (obs) {
            goal_json.obs = obs;
        }
        if (priority) {
            goal_json.importance_degree = Number(priority);
        }
        if (id) {
            goal_json.user_id = Number(id);
        }
        if (days) {
            goal_json.expected_data = days;
        }
        if (goal_json.importance_degree === 0 && goalClickedUpdate && goalClickedUpdate.importance_degree) {
            goal_json.importance_degree = goalClickedUpdate.importance_degree;
        }
        await UpdateGoal(goal_json, goalClickedUpdate.goals_id);
        await Promise.all(items.map(async item => {
            await updateItems(item);
        }));
        for (const id in descriptions) {
            if (descriptions[id]) {
                await registerItems(descriptions[id], goalClickedUpdate.goals_id);
            }
        }
        setGoalClickedUpdate(null);
        setName('');
        setDays('');
        setObs('');
        setPriority('');
        setType('');
        setMayUpdate(true);
        setItems([]);
        setDescriptions({});
        setShowModal(false);
    };

    return (
        <div className='goals_view' style={{ overflowX: 'hidden' }}>
            {goalClickedUpdate ? (
                <div className='goal_update'>
                    <div className='goal_update_body'>
                        <div className='goal_title'>
                            <h3>{goalClickedUpdate.name}</h3>
                        </div>
                        <div className="priority_div">
                            <p className="priority_label"><span>Prioridade: </span></p>
                            <div className="rating">
                                <input value="5" name="rate" id="star5" type="radio" onClick={() => setPriority(5)} />
                                <label title="text" htmlFor="star5"></label>
                                <input value="4" name="rate" id="star4" type="radio" onClick={() => setPriority(4)} />
                                <label title="text" htmlFor="star4"></label>
                                <input value="3" name="rate" id="star3" type="radio" onClick={() => setPriority(3)} />
                                <label title="text" htmlFor="star3"></label>
                                <input value="2" name="rate" id="star2" type="radio" onClick={() => setPriority(2)} />
                                <label title="text" htmlFor="star2"></label>
                                <input value="1" name="rate" id="star1" type="radio" onClick={() => setPriority(1)} />
                                <label title="text" htmlFor="star1"></label>
                            </div>
                        </div>
                        <div>
                            <span>Nome</span>
                            <input className='styled-input' type='text' placeholder="Alterar Nome" maxLength={100} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <span>Observação</span>
                            <input type='text' className='styled-input' placeholder={goalClickedUpdate.obs} maxLength={200} onChange={(e) => setObs(e.target.value)} />
                        </div>
                        <div>
                            <span>Expectativa de finalização: </span>
                            <input type='number' className='styled-input' placeholder='Tempo para concluir em dias' onChange={(e) => setDays(e.target.value)} />
                        </div>
                        <div>
                            <h3>Sub-tarefas já criadas:</h3>
                        </div>
                        {items.map((item, index) => (
                            <div key={index} className="teste">
                                <label>
                                    <input
                                        className='styled-input'
                                        type="text"
                                        value={item.desc}
                                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                                    />
                                </label>
                            </div>
                        ))}
                        <ItemCreator descriptions={descriptions} setDescriptions={setDescriptions} />
                    </div>
                    <div className='buttons'>
                        <div className='botao close' onClick={() => setGoalClickedUpdate(null)}>
                            <span>Fechar</span>
                        </div>  
                        <div className='botao' onClick={() =>{
                            verify_and_save_goal()
                            setNotificationMessage("conseguimos alterar sua meta!")
                        }}>
                            <span>Salvar</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <GoalCreator id={id} mayUpdate={mayUpdate} setMayUpdate={setMayUpdate} types={types} />
                    <div className='goals_grid'>
                        {empty ? (
                            <div>
                                Você ainda não possui nenhuma meta cadastrada! Mas não seja por isso, crie uma agora mesmo!
                            </div>
                        ) : (
                            Object.values(goals).map((goal, key) => (
                                <div key={key} className='goal_card'>
                                    <div className='edit_button_goals' onClick={async () => {
                                        const itemsResponse = await getItemsByGoal(goal.goals_id);
                                        const itemsArray = Object.values(itemsResponse);
                                        setItems(itemsArray);
                                        setGoalClickedUpdate(goal)
                                    }}>
                                        <FaRegEdit />
                                    </div>
                                    <div onClick={() => handleOpenModal(goal)}>
                                        <div className='goal_title'>
                                            <h3 className='name'>{goal.name}</h3>
                                            <h4 className='importance'>{goal.importance_degree}★</h4>
                                        </div>
                                        <h5 className='goal_obs'>{goal.obs}</h5>
                                        <div className='goal_data'>
                                            <p><span>Início:</span> {goal.initial_data}</p>
                                            <p><span>Expectativa:</span> {goal.expected_data}</p>
                                            <p><span>Tipo:</span> {goal.type_name}</p>
                                            <p><span>Ciclos de Pomodoro: </span> {goal.pomodoro_cycles}</p>
                                            <p>
                                                <span>Recompensa: </span>
                                                {goal.goal_value === -1 ? 0 : goal.goal_value} 🪙
                                            </p>
                                            {goal.end_date ? <p><span>Finalizada em:</span> {goal.end_date}</p> : ''}
                                        </div>
                                        {goal.end_date ? (
                                            <div className='top_left_botao' onClick={() => {
                                                deactivateTask(false, goal.goals_id) 
                                                setNotificationMessage("Sua meta foi reativada com sucesso!")
                                            }
                                            }>
                                                <span>Reativar tarefa</span>
                                            </div>
                                        ) : (
                                            <div className='top_left_botao' onClick={() => {
                                                deactivateTask(new Date().toISOString().split('T')[0], goal.goals_id)
                                                setNotificationMessage("Sua meta foi finalizada com sucesso!")
                                            }
                                            }>
                                                <GrCompliance />
                                            </div>
                                        )}
                                        <div className='fixed_botao' onClick={async () => {
                                            await deleteGoals(goal.goals_id);
                                            setShowModal(false);
                                            setMayUpdate(true);
                                            setNotificationMessage("conseguimos deletar sua meta!")
                                        }}>
                                            <span><FaRegTrashCan/></span>
                                        </div>
                                    </div>
                                    <PomodoroModel id={goal.goals_id} key={key} goal_name={goal.name}/>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{goalClicked && goalClicked.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='subtasks'>
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div key={index} className='subtask_item'>
                                    <label className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={item.ativo}
                                            onChange={() => handleCheckboxChange(item)}
                                        />
                                    </label>
                                    {item.desc}
                                    <button onClick={async () => {
                                        await deleteItems(item.id);
                                        const updatedItems = items.filter(i => i.id !== item.id);
                                        setItems(updatedItems);
                                    }}><FaRegTrashCan/></button>
                                </div>
                            ))
                        ) : (
                            <p>Nenhuma subtarefa encontrada.</p>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
            <FinishedGoals id={id} mayUpdate={mayUpdate} setMayUpdate={setMayUpdate}/>
            <CapMessage ref={capMessageRef} message={notificationMessage} id_user={id} />
        </div>
    );
}

export default GoalsContainer;
