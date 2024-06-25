import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";
import Dropdown from 'react-bootstrap/Dropdown';
import { createGoal, registerItems } from '../services/goals_request';
import './Style/goals_container.css'
import ItemCreator from './subItemsCreator';

function GoalCreator({ id, mayUpdate, setMayUpdate, types }) {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [obs, setObs] = useState('');
    const [priority, setPriority] = useState(3);
    const [type, setType] = useState(1);
    const [days, setDays] = useState(30);
    const [message, setMessage] = useState('');
    const [items, setItems] = useState([]);
    const [lastItems, setLastItems] = useState(0);
    const [descriptions, setDescriptions] = useState({});

    const addItem = () => {
        const newItem = { id: lastItems + 1, description: '' };
        setLastItems(lastItems + 1);
        setItems([...items, newItem]);
    };

    const nameChange = (e) => {
        setName(e.target.value);
    };

    const obsChange = (e) => {
        setObs(e.target.value);
    };

    const dateChange = (e) => {
        setDays(e.target.value);
    };

    const handlePriority = (degree) => {
        setPriority(degree);
    };

    const handleType = (type) => {
        setType(type);
    };

    const handleModal = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    async function verify_and_save_goal() {
        if (!name || !obs || !days) {
            setMessage("Valores não podem estar vazios");
        } else {
            const goal_json = {
                "name": name,
                "obs": obs,
                "importance_degree": Number(priority),
                "user_id": Number(id),
                "type_id": Number(type),
                "expected_data": days
            };
            const response = await createGoal(goal_json);
            if (response.message === "the goal has been created") {
                for (const id in descriptions) {
                    if (descriptions[id] !== '') {
                        await registerItems(descriptions[id], response.id)
                    }
                }
                handleClose();
            }
            setMayUpdate(true);
        }
    }

    const renderedTypes = types.types.map((item) => (
        <Dropdown.Item key={item.id} onClick={() => handleType(item.id)}><p>{item.name}</p></Dropdown.Item>
    ));

    return (
        <div>
            <h1>Metas</h1>
            <div className='new_goal_button' onClick={handleModal}>
                Criar nova Meta +
            </div>
            <Modal show={showModal} onHide={handleClose} centered size="xl" dialogClassName="custom-modal">
                <Modal.Header>
                    <Modal.Title><h1 className='modal_title'>Crie sua nova meta!</h1></Modal.Title>
                    <IoMdClose onClick={handleClose} className='close_button' />
                </Modal.Header>
                <Modal.Body>
                    <div className='form_grid'>
                        <input type='text' placeholder='Nome de sua meta' maxLength={100} onChange={nameChange} className='styled-input'/>
                        <div className="priority_div">
                            <p className="priority_label"><span>Prioridade: </span></p>
                            <div className="rating">
                                <input value="5" name="rate" id="star5" type="radio" onClick={() => setPriority(5)} />
                                <label title="text" htmlFor="star5"></label>
                                <input value="4" name="rate" id="star4" type="radio" onClick={() => setPriority(4)} />
                                <label title="text" htmlFor="star4"></label>
                                <input value="3" name="rate" id="star3" type="radio" checked onClick={() => setPriority(3)} />
                                <label title="text" htmlFor="star3"></label>
                                <input value="2" name="rate" id="star2" type="radio" onClick={() => setPriority(2)} />
                                <label title="text" htmlFor="star2"></label>
                                <input value="1" name="rate" id="star1" type="radio" onClick={() => setPriority(1)} />
                                <label title="text" htmlFor="star1"></label>
                            </div>
                        </div>
                        <input type='text' placeholder='Observações' maxLength={200} onChange={obsChange} className='styled-input'/>
                        <input type='number' placeholder='Tempo para concluir em dias' onChange={dateChange} className='styled-input'/>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Qual é a categoria?
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {renderedTypes}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <ItemCreator descriptions={descriptions} setDescriptions={setDescriptions}/>

                    {message && <div>{message}</div>}
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
    );
}

export default GoalCreator;
