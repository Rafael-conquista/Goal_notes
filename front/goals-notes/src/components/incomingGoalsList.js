import { useState, useEffect } from 'react';
import { verify } from '../utils/token_verify.js';
import { get_user } from '../services/user_requests.js';
import { getNextGoalsList } from '../services/goals_request.js';

function IncomingGoalsList({id}) {
    const [loaded, setLoaded] = useState(false);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        if (id) {
            getNextGoalsList(id).then((dados) => {
                setGoals(dados.goals);
                setLoaded(true);
            });
        }
    }, [id]);

    if (!loaded) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="feed_container">
            <div>
                <div>
                    {goals && goals.length > 0 ? (
                        goals.map((goals, index) => (
                            <div key={index} className=''>
                                <div style={{
                                    color: '#9f9f9f',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    paddingBottom: '45px',
                                    paddingRight: '25px',
                                    paddingLeft: '25px'
                                }}>
                                    A tarefa {goals.name} está quase chegando em sua data final❗
                                    <p>
                                        no dia {new Date(goals.expected_data).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum meta a ser finalizada</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default IncomingGoalsList;
