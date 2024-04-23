import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";
import Dropdown from 'react-bootstrap/Dropdown';
import { createGoal } from '../services/goals_request';
import './Style/goals_container.css'

function GoalCreator({ id, mayUpdate, setMayUpdate }) {
    const [showModal, setShowModal] = useState(false);
    const [createSubtasks, setCreateSubtasks] = useState(false);
    const [name, setName] = useState('');
    const [obs, setObs] = useState('');
    const [priority, setPriority] = useState(1);
    const [type, setType] = useState(1);
    const [days, setDays] = useState(30);
    const [message, setMessage] = useState('');

    const nameChange = (e) => {
        setName(e.target.value)
    }

    const obsChange = (e) => {
        setObs(e.target.value)
    }

    const dateChange = (e) => {
        setDays(e.target.value)
    }

    const handlePriority = (degree) => {
        setPriority(degree)
    }

    const handleType = (type) => {
        setType(type)
    }

    const handleModal = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    async function verify_and_save_goal(){
        if(!name || !obs || !days){
            setMessage("Valores não podem estar vazios")
        }else{
            const goal_json = {
                "name": name,
                "obs": obs,
                "importance_degree": Number(priority),
                "user_id": Number(id),
                "type_id": Number(type),
                "expected_data": days
            };
            const response = await createGoal(goal_json)
            if(response.message === "the goal has been created"){
                setMessage("meta criada com sucesso!")
                handleClose()
            }
            setMayUpdate(true)
        }  
    }

    return (
        <div>
            <h1>
                Minhas Metas
            </h1>
            <div className='new_goal_button' onClick={handleModal}>
                Criar nova Meta +
            </div>
            <Modal show={showModal} onHide={handleClose} centered size="xl">
                <Modal.Header>
                    <Modal.Title><h1 className='modal_title'>Crie sua nova meta!</h1></Modal.Title>
                    <IoMdClose onClick={handleClose} className='close_button' />
                </Modal.Header>
                <Modal.Body>
                    <div className='form_grid'>
                        <input type='text' placeholder='Nome de sua meta' maxLength={100} onChange={nameChange} />
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Grau de prioridade
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handlePriority(1)}>1</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlePriority(2)}>2</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlePriority(3)}>3</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlePriority(4)}>4</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlePriority(5)}>5</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <input type='text' placeholder='observações' maxLength={200} onChange={obsChange} />
                        <input type='number' placeholder='Tempo para concluir em dias' onChange={dateChange} />
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Qual é a categoria?
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleType(1)}>1</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleType(1)}>2</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleType(1)}>3</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleType(1)}>...</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Deseja criar sub-tarefas?
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setCreateSubtasks(true)}>Sim</Dropdown.Item>
                                <Dropdown.Item>Não</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {message ? 
                        <div>{message}</div> : <div></div>
                    }
                </Modal.Body>
                <Modal.Footer className='modal_footer'>
                    <div className='buttons'>
                        <div className='botao close' onClick={handleClose}>
                            <span>Fechar</span>
                        </div>
                        <div className='botao' onClick={verify_and_save_goal}>
                            <span>Salvar</span>
                        </div>
                    </div>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default GoalCreator;
