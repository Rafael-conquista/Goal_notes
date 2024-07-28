import { useState, useEffect } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";

function ItemCreator({descriptions, setDescriptions}){
    const [items, setItems] = useState([]);
    const [lastItems, setLastItems] = useState(0);

    const addItem = () => {
        const newItem = { id: lastItems + 1, description: '' };
        setLastItems(lastItems + 1);
        setItems([...items, newItem]);
    };

    const handleInputChange = (id, value) => {
        setDescriptions({ ...descriptions, [id]: value });
    };

    const removeItem = (id) => {
        // Filtra a lista para excluir o item com o id especificado
        const novaLista = items.filter(item => item.id !== id);
        setItems(novaLista);

        // Remove a descrição correspondente
        const newDescriptions = { ...descriptions };
        delete newDescriptions[id];
        setDescriptions(newDescriptions);
    };

    return(
        <div>
            <div className='new_goal_button' onClick={addItem}>
                Criar sub-tarefa +
            </div>
                {items.map((item, index) => (
                    <div key={index} className="">
                        <label>
                            Sub-tarefa {item.id}:
                            <input
                                className='styled-input'
                                type="text"
                                value={descriptions[item.id] || ''}
                                onChange={(e) => handleInputChange(item.id, e.target.value)}
                            />
                        </label>
                        <button className="fixed_button" onClick={() => removeItem(item.id)}><FaRegTrashCan/></button>
                    </div>
                ))}
        </div>
    )

}

export default ItemCreator;