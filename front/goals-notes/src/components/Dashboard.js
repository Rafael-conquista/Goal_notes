import React, { useEffect, useState } from 'react';
import './Style/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { GoGoal } from "react-icons/go";
import { GiThreeFriends } from "react-icons/gi";
import { GiTomato } from "react-icons/gi";
import { AiFillSkin } from "react-icons/ai";
import get_api_url from "../config";

const Dashboard = (id) => {
  const [data, setData] = useState(null);
  const [showGoals, setShowGoals] = useState(false);
  const [showFriendsGoal, setShowFriendsGoal] = useState(false);
  const [showTotalPomodoros, setShowTotalPomodoros] = useState(false);
  const [showTotalSkins, setShowTotalSkins] = useState(false);

  const apiUrl = get_api_url();

  useEffect(() => {
    fetch(apiUrl + '/user_infos/' + id.id)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        setData({}); // caso haja um erro, setar data como objeto vazio
      });
  }, [id.id]);

  const incompletedGoalsCount = data?.incompleted_goals ? Object.keys(data.incompleted_goals).length : 0;
  const completedGoalsCount = data?.completed_goals ? Object.keys(data.completed_goals).length : 0;

  const lastCompletedGoal = data?.last_completed_goals?.goals?.[0];
  const nextGoal = data?.next_goals?.goals?.[0];

  function setAllOff() {
    setShowFriendsGoal(false);
    setShowTotalPomodoros(false);
    setShowGoals(false);
    setShowTotalSkins(false);
  }

  return (
    <div className='dashboard_all'>
      <h1>User Goals Dashboard</h1>

      <div className="dashboard-button-container">
        <div className='dashboard-card_buttons'>
          <div className='dashboard-icon'>
            <GoGoal />
          </div>
          <h3>Métricas de Metas</h3>
          <p>Você está em constante evolução! Que tal ver o seu progresso?</p>
          <div onClick={() => {
            setAllOff();
            setShowGoals(true);
          }} className="dashboard-button">
            Ver minha Evolução
          </div>
        </div>

        <div className='dashboard-card_buttons'>
          <div className='dashboard-icon'>
            <GiTomato />
          </div>
          <h3>Métricas de Pomodoros</h3>
          <p>Veja seus resultados ao realizar o método de Pomodoro!</p>
          <div onClick={() => {
            setAllOff();
            setShowTotalPomodoros(true);
          }} className="dashboard-button">
            Ver minha Evolução
          </div>
        </div>

        <div className='dashboard-card_buttons'>
          <div className='dashboard-icon'>
            <GiThreeFriends />
          </div>
          <h3>Métricas de Amigos</h3>
          <p>Que tal dar uma olhada o quanto você socializou?</p>
          <div onClick={() => {
            setAllOff();
            setShowFriendsGoal(true);
          }} className="dashboard-button">
            Ver minha Evolução
          </div>
        </div>

        <div className='dashboard-card_buttons'>
          <div className='dashboard-icon'>
            <AiFillSkin />
          </div>
          <h3>Métricas de skins</h3>
          <p>Ficar estiloso é sempre bom! Veja suas métricas de skin</p>
          <div onClick={() => {
            setAllOff();
            setShowTotalSkins(true);
          }} className="dashboard-button">
            Ver minha Evolução
          </div>
        </div>
      </div>

      {/* Modais */}
      <Modal show={showGoals} onHide={() => setShowGoals(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Goals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dashboard-container">
            <section className="modal-section">
              <h2>Total de metas</h2>
              <p>Total: {data?.total_goals || 0}</p>
            </section>

            <section className="modal-section">
              <h2>Metas em Andamento</h2>
              <p>Total: {completedGoalsCount}</p>
            </section>

            <section className="modal-section">
              <h2>Metas finalizadas</h2>
              <p>Total: {incompletedGoalsCount}</p>
            </section>

            <section className="modal-section">
              <h2>Última meta finalizada</h2>
              {lastCompletedGoal ? (
                <div>
                  <h4>{lastCompletedGoal.name}</h4>
                  <p>Finalizada em: {new Date(lastCompletedGoal.end_date).toLocaleDateString('pt-BR')}</p>
                </div>
              ) : (
                <p>Sem metas em progresso.</p>
              )}
            </section>

            <section className="modal-section">
              <h2>Meta mais próxima</h2>
              {nextGoal ? (
                <div>
                  <h4>{nextGoal.name}</h4>
                  <p>Expectativa: {new Date(nextGoal.expected_data).toLocaleDateString('pt-BR')}</p>
                </div>
              ) : (
                <p>Sem próximas metas.</p>
              )}
            </section>

            <section className="modal-section">
              <h2>Meta mais valiosa em progresso</h2>
              {data?.most_valuable_goal ? (
                <div>
                  <h3>{data.most_valuable_goal.name}</h3>
                  <p>CapCoins: {data.most_valuable_goal.capcoins} 🪙</p>
                </div>
              ) : (
                <p>Sem metas valiosas em progresso.</p>
              )}
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGoals(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFriendsGoal} onHide={() => setShowFriendsGoal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Friends Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dashboard-container">
            <section className="modal-section">
              <h2>Total de Amigos</h2>
              <p>{data?.len_amigos || 0}</p>
            </section>

            <section className="modal-section">
              <h2>Total de Amigos (30 dias)</h2>
              <p>{data?.amigos_mes || 0}</p>
            </section>

            <section className="modal-section">
              <h2>Amizade mais antiga</h2>
              {data?.oldest_amigo ? (
                <>
                  <p>{data.oldest_amigo.name}</p>
                  <p>{data.oldest_amigo.data_cadastro ? new Date(data.oldest_amigo.data_cadastro).toLocaleDateString('pt-BR') : 'N/A'}</p>
                </>
              ) : (
                <p>Sem amizades antigas.</p>
              )}
            </section>

            <section className="modal-section">
              <h2>Amizade mais nova</h2>
              {data?.newest_amigo ? (
                <>
                  <p>{data.newest_amigo.name}</p>
                  <p>{data.newest_amigo.data_cadastro ? new Date(data.newest_amigo.data_cadastro).toLocaleDateString('pt-BR') : 'N/A'}</p>
                </>
              ) : (
                <p>Sem amizades recentes.</p>
              )}
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFriendsGoal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showTotalPomodoros} onHide={() => setShowTotalPomodoros(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Total Pomodoros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dashboard-container">
            <section className="modal-section">
              <h2>Ciclos Finalizados</h2>
              <p>{data?.total_pomodoro || 0}</p>
            </section>

            <section className="modal-section">
              <h2>Tempo total (minutos)</h2>
              <p>{data?.time_pomodoro || 0}</p>
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTotalPomodoros(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showTotalSkins} onHide={() => setShowTotalSkins(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Total Skins</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dashboard-container">
            <section className="modal-section">
              <h2>Total de Skins</h2>
              <p>{data?.total_skins || 0}</p>
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTotalSkins(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
