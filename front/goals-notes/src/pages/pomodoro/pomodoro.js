import React, { useState, useEffect } from 'react';
import styles from './pomodoro.module.css';
import { verify } from '../../utils/token_verify';
import { get_user } from '../../services/user_requests.js'

const PomodoroTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [cycles, setCycles] = useState(0);
  const [id, setId] = useState()
  const [name, setName] = useState('')

  async function verify_user(token){
    const token_id = await verify(token)
    const url = new URL(window.location.href);

    if (sessionStorage.getItem("first_acess")){
      window.location.href = `/CapCreate`;
    }
    if(url.href.includes(`/${token_id}/`)){
      console.log('token válido')
    }else{
      console.log('usuário não condiz com a url informada')
      window.location.href = `/`;
    }
    const user = await get_user(token_id)
    return { id: token_id, name: user['name'] };
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    verify_user(token).then(({ id, name }) => {
      setId(id)
      setName(name)
    });
  }, []);

  useEffect(() => {
    let timer = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      if (mode === 'work') {
        if ((cycles + 1) % 4 === 0) {
          setMode('longBreak');
          setSecondsLeft(15 * 60); // 15 minutes
        } else {
          setMode('shortBreak');
          setSecondsLeft(5 * 60); // 5 minutes
        }
        setCycles(cycles + 1);
      } else {
        setMode('work');
        setSecondsLeft(25 * 60); // 25 minutes
      }
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, mode, cycles]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secondsPart = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secondsPart < 10 ? '0' : ''}${secondsPart}`;
  };

  const handleStartPause = () => {
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(mode === 'work' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60);
  };

  return (
    <div className={styles.pomodoroTimer}>
      <h2 className={styles.title}>{mode === 'work' ? 'Hora de se concentrar!' : mode === 'shortBreak' ? 'Descanso Curto' : 'Descanso Longo'}</h2>
      <div className={styles.timer}>
        {formatTime(secondsLeft)}
      </div>
      <div className={styles.buttons}>
        <button onClick={handleStartPause}>
          {isRunning ? 'Pausar' : 'Começar'}
        </button>
        <button className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
