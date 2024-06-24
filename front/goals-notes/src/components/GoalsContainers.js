import React, { useState, useEffect } from 'react';
import GoalCreator from './goalCreator';
import ItemCreator from './subItemsCreator';
import './Style/goals_container.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { UpdateGoal, deleteGoals, deleteItems, getItemsByGoal, registerItems, updateItems } from '../services/goals_request';

function GoalsContainer({ goals, id, mayUpdate, setMayUpdate, types }) {
    const [empty, setEmpty] = useState(true);
    const [goalClicked, setGoalClicked] = useState(null);
    const [goalClickedUpdate, setGoalClickedUpdate] = useState(null);
    const [name, setName] = useState('');
    const [obs, setObs] = useState('');
    const [priority, setPriority] = useState('');
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
        const goal_json = {
            name: name,
            obs: obs,
            importance_degree: Number(priority),
            user_id: Number(id),
            type_id: Number(type),
            expected_data: days,
        };
        await UpdateGoal(goal_json, goalClicked.goals_id);
        items.forEach(async item => {
            await updateItems(item);
        });
        for (const id in descriptions) {
            if (descriptions[id] !== '') {
                await registerItems(descriptions[id], goalClicked.goals_id);
            }
        }
        setGoalClicked(null);
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
            <GoalCreator id={id} mayUpdate={mayUpdate} setMayUpdate={setMayUpdate} types={types} />
            {goalClickedUpdate ? ( /* Renderização do formulário de edição */
                <div className='goal_card'>
                    <div>
                        <div className='goal_title'>
                            {goalClickedUpdate.name}
                        </div>
                        <p>Nome da meta:</p>
                        <input type='text' placeholder={goalClickedUpdate.name} maxLength={100} onChange={(e) => setName(e.target.value)} />
                        <div>
                            <p>{goalClickedUpdate.importance_degree}★</p>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Grau de prioridade
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setPriority('1')}>1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setPriority('2')}>2</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setPriority('3')}>3</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setPriority('4')}>4</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setPriority('5')}>5</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div>
                            <p>Observação</p>
                            <input type='text' placeholder={goalClickedUpdate.obs} maxLength={200} onChange={(e) => setObs(e.target.value)} />
                        </div>
                        <p>Expectativa de finalização: <input type='number' placeholder='Tempo para concluir em dias' onChange={(e) => setDays(e.target.value)} /></p>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Qual é a categoria?
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {/* Aqui você renderiza as opções de categoria */}
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
                        {/* Componente ItemCreator para criar novas subtarefas */}
                        <ItemCreator descriptions={descriptions} setDescriptions={setDescriptions} />
                        <div className='buttons'>
                            <div className='botao close' onClick={() => setGoalClickedUpdate(null)}>
                                <span>Fechar</span>
                            </div>
                            <div className='botao' onClick={verify_and_save_goal}>
                                <span>Salvar</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='goals_grid'>
                    {empty ? (
                        <div>
                            Você ainda não possui nenhuma meta cadastrada! Mas não seja por isso, crie uma agora mesmo!
                        </div>
                    ) : (
                        Object.values(goals).map((goal, key) => (
                            <div key={key} className='goal_card'>
                                <div className='edit_button' onClick={() => setGoalClickedUpdate(goal)}>
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
                                        setMayUpdate(true);
                                    }}>
                                        <span>Excluir meta</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Modal para exibir as subtarefas */}
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
                                        {item.desc}
                                    </label>
                                    <button onClick={async () =>{
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
                    <Button variant="primary" onClick={verify_and_save_goal}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default GoalsContainer;
