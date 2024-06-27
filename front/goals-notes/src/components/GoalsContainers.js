import React, { useState, useEffect } from 'react';
import GoalCreator from './goalCreator';
import ItemCreator from './subItemsCreator';
import './Style/goals_container.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { UpdateGoal, deleteGoals, deleteItems, getItemsByGoal, registerItems, updateItems } from '../services/goals_request';
import PomodoroModel from './pomodoroModal';

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

    useEffect(() => {
        setEmpty(Object.keys(goals).length === 0);
    }, [goals, goalClicked]);

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
        // Inicializa um objeto vazio para o goal_json
        const goal_json = {};

        // Adiciona apenas os campos que estão preenchidos
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

        // Se importance_degree for zero, substitui pelo valor existente de goalClickedUpdate.importance_degree
        if (goal_json.importance_degree === 0 && goalClickedUpdate && goalClickedUpdate.importance_degree) {
            goal_json.importance_degree = goalClickedUpdate.importance_degree;
        }

        // Chama a função de atualização do objetivo (goal)
        await UpdateGoal(goal_json, goalClickedUpdate.goals_id);

        // Atualiza cada item
        await Promise.all(items.map(async item => {
            await updateItems(item);
        }));

        // Registra novos items se houver descrições preenchidas
        for (const id in descriptions) {
            if (descriptions[id]) { // Verifica se a descrição não é vazia
                await registerItems(descriptions[id], goalClickedUpdate.goals_id);
            }
        }

        // Limpa os estados e reinicia a interface
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
            {goalClickedUpdate ? ( /* Renderização do formulário de edição */
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
                            <p>Nome</p>
                            <input className='styled-input' type='text' placeholder="Alterar Nome" maxLength={100} onChange={(e) => setName(e.target.value)} />
                        </div>


                        <div>
                            <p>Observação</p>
                            <input type='text' className='styled-input' placeholder={goalClickedUpdate.obs} maxLength={200} onChange={(e) => setObs(e.target.value)} />
                        </div>
                        <div>
                            <p>Expectativa de finalização: </p>
                            <input type='number' className='styled-input' placeholder='Tempo para concluir em dias' onChange={(e) => setDays(e.target.value)} />
                        </div>
                        <div>
                            <h3>Sub-tarefas já criadas:</h3>
                        </div>
                        {items.map((item, index) => (
                            <div key={index} className="item">
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
                        <div className='botao' onClick={verify_and_save_goal}>
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
                                    <div className='edit_button' onClick={async () => {
                                        const itemsResponse = await getItemsByGoal(goal.goals_id);
                                        const itemsArray = Object.values(itemsResponse);
                                        setItems(itemsArray);
                                        setGoalClickedUpdate(goal)
                                    }
                                    }>
                                        Editar
                                    </div>
                                    <div onClick={() => handleOpenModal(goal)}>
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

                                        {goal.end_date ? (
                                            <div className='top_left_botao' onClick={() => deactivateTask(false, goal.goals_id)}>
                                                <span>Reativar tarefa</span>
                                            </div>
                                        ) : (
                                            <div className='top_left_botao' onClick={() => deactivateTask(true, goal.goals_id)}>
                                                <span>Finalizar tarefa</span>
                                            </div>
                                        )}

                                        <div className='fixed_botao' onClick={async () => {
                                            await deleteGoals(goal.goals_id);
                                            setShowModal(false);
                                            setMayUpdate(true);
                                        }}>
                                            <span>Excluir meta</span>
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
                                    <label>
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
                                    }}>Excluir</button>
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
        </div>
    );
}

export default GoalsContainer;
