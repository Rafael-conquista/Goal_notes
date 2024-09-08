import React, { useEffect, useState } from 'react';
import './Style/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { GoGoal } from "react-icons/go";
import { GiThreeFriends } from "react-icons/gi";
import { GiTomato } from "react-icons/gi";
import { AiFillSkin } from "react-icons/ai";


const Dashboard = () => {
  const [data, setData] = useState(null);
  const [showGoals, setShowGoals] = useState(false);
  const [showFriendsGoal, setShowFriendsGoal] = useState(false);
  const [showTotalPomodoros, setShowTotalPomodoros] = useState(false);
  const [showTotalSkins, setShowTotalSkins] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/user_infos/1')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const incompletedGoalsCount = Object.keys(data.incompleted_goals).length;
  const completedGoalsCount = Object.keys(data.completed_goals).length;

  const lastCompletedGoal = data.last_completed_goals.goals[0];
  const nextGoal = data.next_goals.goals[0];

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
          <h3>
            {showGoals ? 'Métricas de Metas' : 'Métricas de Metas'}
          </h3>
          <p>
            Você está em constante evolução! Que tal ver o seu progresso?
          </p>
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
          <h3>
            {showTotalPomodoros ? 'Métricas de Pomodoros' : 'Métricas de Pomodoros'}
          </h3>
          <p>
            Veja seus resultados ao realizar o método de Pomodoro!
          </p>
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
          <h3>
            {showFriendsGoal ? 'Métricas de Amigos' : 'Métricas de Amigos'}
          </h3>
          <p>
            Que tal dar uma olhada o quanto você socializou?
          </p>
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
          <h3>
            {showTotalPomodoros ? 'Métricas de skins' : 'Métricas de skins'}
          </h3>
          <p>
            Ficar estiloso é sempre bom! Veja suas métricas de skin
          </p>
          <div onClick={() => {
          setAllOff();
          setShowTotalSkins(true);
          }} className="dashboard-button">
            Ver minha Evolução
          </div>
        </div>

      </div>

      {/* Modais */}
      <Modal
        show={showGoals}
        onHide={() => setShowGoals(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Goals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dashboard-container">
            <section className="modal-section">
              <h2>Metas Finalizadas</h2>
              <p>Total: {incompletedGoalsCount}</p>
            </section>

            <section className="modal-section">
              <h2>Metas em Progresso</h2>
              <p>Total: {completedGoalsCount}</p>
            </section>

            <section className="modal-section">
              <h2>Última meta finalizada</h2>
              {lastCompletedGoal ? (
                <div>
                  <h3>{lastCompletedGoal.name}</h3>
                  <p>Finalizada em: {lastCompletedGoal.end_date}</p>
                </div>
              ) : (
                <p>No completed goals available.</p>
              )}
            </section>

            <section className="modal-section">
              <h2>Meta mais próxima</h2>
              {nextGoal ? (
                <div>
                  <h3>{nextGoal.name}</h3>
                  <p>Expectativa: {nextGoal.expected_data}</p>
                </div>
              ) : (
                <p>No next goals available.</p>
              )}
            </section>

            <section className="modal-section">
              <h2>Meta mais valiosa em progresso</h2>
              <div>
                <h3>{data.most_valuable_goal.name}</h3>
                <p>CapCoins: {data.most_valuable_goal.capcoins}  🪙</p>
              </div>
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGoals(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showFriendsGoal}
        onHide={() => setShowFriendsGoal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Friends Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dashboard-container">
            <section className="modal-section">
              <h2>Total de Amigos</h2>
              <p>{data.len_amigos}</p>
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFriendsGoal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showTotalPomodoros}
        onHide={() => setShowTotalPomodoros(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Total Pomodoros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dashboard-container">
            <section className="modal-section">
              <h2>Ciclos Finalizados</h2>
              <p>{data.total_pomodoro}</p>
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTotalPomodoros(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showTotalSkins}
        onHide={() => setShowTotalSkins(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Total Skins</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dashboard-container">
            <section className="modal-section">
              <h2>Total de Skins</h2>
              <p>{data.total_skins}</p>
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
