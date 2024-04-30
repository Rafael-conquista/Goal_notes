import { useState, useEffect } from 'react';
import GoalCreator from './goalCreator';
import './Style/goals_container.css'
import { Modal } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";
import Dropdown from 'react-bootstrap/Dropdown';

function GoalsContainer({ goals, id, mayUpdate, setMayUpdate, types }) {
    const [empty, setEmpty] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [goalClicked, setGoalClicked] = useState()

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

    const renderedTypes = types.types.map((item) => {
        return (
            <Dropdown.Item ><p>{item.name}</p></Dropdown.Item>
        );
      });

    return (
        <div className='goals_view' style={{ overflowX: 'hidden' }}>
            {!goalClicked ? <div>
            <GoalCreator id={id} mayUpdate={mayUpdate} setMayUpdate={setMayUpdate} types={types}/>
            <div>
                {empty ?
                    <div>
                        Você ainda não possui nenhuma meta cadastrada! Mas não seja por isso, crie uma agora mesmo!
                    </div>
                    :
                    goalsArray.map((goal, key) => {
                        return (
                            <div key={key} className='goal_card'>
                                <div onClick={()=>{
                                    setGoalClicked(goal)
                                }}>
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
                                </div>
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
                        <input type='text' placeholder={goalClicked.name} maxLength={100} />
                        <div>
                        <p>{goalClicked.importance_degree}★</p>
                        <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Grau de prioridade
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>1</Dropdown.Item>
                                    <Dropdown.Item>2</Dropdown.Item>
                                    <Dropdown.Item>3</Dropdown.Item>
                                    <Dropdown.Item>4</Dropdown.Item>
                                    <Dropdown.Item>5</Dropdown.Item>
                                </Dropdown.Menu>
                        </Dropdown>
                    </div>
                <div>
                    <p>observação</p>
                    <input type='text' placeholder={goalClicked.obs} maxLength={200} />
                </div>
                <p></p>
                <p>expectativa de finalização: <input type='number' placeholder='Tempo para concluir em dias' /></p>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Qual é a categoria?
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {renderedTypes}
                    </Dropdown.Menu>
                </Dropdown>
                <div className='buttons'>
                    <div className='botao close'>
                        <span>Fechar</span>
                    </div>
                    <div className='botao'>
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
