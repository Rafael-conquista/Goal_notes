import { useState, useEffect } from 'react';
import { verify } from '../utils/token_verify.js';
import { get_user } from '../services/user_requests.js';
import { getFinishedGoalsList } from '../services/goals_request.js';

function LastGoalsList({id}) {
    const [loaded, setLoaded] = useState(false);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        if (id) {
            getFinishedGoalsList(id).then((dados) => {
                setGoals(dados.goals);
                setLoaded(true);
            });
            console.log(goals)
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
                                }}>
                                    Você finalizou a tarefa {goals.name}!
                                    <p>
                                        no dia {goals.end_date}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum meta finalizada recentemente</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LastGoalsList;
