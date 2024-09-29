import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";
import './Style/goals_container.css';
import styles from './Style/pomodoro.module.css';
import { UpdateGoal } from '../services/goals_request';
import CapMessage from './CapMessages';
import Orientation from 'react-native-orientation-locker';

function PomodoroModel({ id, key, goal_name }) {
    const [showModal, setShowModal] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutos
    const [isRunning, setIsRunning] = useState(false);
    const [timerVisible, setTimerVisible] = useState(true);
    const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
    const [cycles, setCycles] = useState(0);
    const capMessageRef = useRef();
    const endTimeRef = useRef(null);

    async function pomodoro_cycle_register() {
        const goal_json = { pomodoro_cycles: 1 };
        await UpdateGoal(goal_json, id);
        handleClick();
    }

    const handleClick = () => {
        if (capMessageRef.current) {
            capMessageRef.current.triggerToast();
        }
    };

    const handleModal = () => {
        setShowModal(true);
        localStorage.removeItem('pomodoroTime');
        localStorage.removeItem('pomodoroEndTime');
        setSecondsLeft(25 * 60);
        setIsRunning(false);
        setMode('work');
        setCycles(0);
    };

    const handleClose = () => {
        setShowModal(false);
        console.log(`fechou com ${cycles} ciclos`);
        window.location.reload();
    };

    useEffect(() => {
        const savedTime = localStorage.getItem('pomodoroTime');
        const savedEndTime = localStorage.getItem('pomodoroEndTime');

        if (savedTime && savedEndTime) {
            const remainingTime = JSON.parse(savedTime);
            const endTime = new Date(JSON.parse(savedEndTime));
            const currentTime = new Date();

            if (endTime > currentTime) {
                setSecondsLeft(Math.max(0, Math.floor((endTime - currentTime) / 1000)));
                setIsRunning(true);
            } else {
                setSecondsLeft(25 * 60);
                localStorage.removeItem('pomodoroTime');
                localStorage.removeItem('pomodoroEndTime');
            }
        }

        const handleBeforeUnload = () => {
            const endTime = new Date(Date.now() + secondsLeft * 1000);
            localStorage.setItem('pomodoroTime', secondsLeft);
            localStorage.setItem('pomodoroEndTime', JSON.stringify(endTime));
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (isRunning) {
            endTimeRef.current = Date.now() + secondsLeft * 1000;

            const timer = setInterval(() => {
                setSecondsLeft(prev => {
                    if (prev <= 1) {
                        // Lógica de transição entre ciclos
                        if (mode === 'work') {
                            setCycles(cycles + 1);
                            setIsRunning(false);
                            pomodoro_cycle_register();

                            if ((cycles + 1) % 4 === 0) {
                                setMode('longBreak');
                                return 15 * 60;
                            } else {
                                setMode('shortBreak');
                                return 5 * 60;
                            }
                        } else {
                            setMode('work');
                            return 25 * 60;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isRunning, mode, cycles]);

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const secondsPart = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secondsPart < 10 ? '0' : ''}${secondsPart}`;
    };

    const handleStartPause = () => {
        setIsRunning(prev => !prev);
        
        if (!isRunning) {
            Orientation.lockToLandscape();
        }
    };

    const handleInvisibleTime = () => {
        setTimerVisible(prev => !prev);
    };

    const handleReset = () => {
        setIsRunning(false);
        setSecondsLeft(25 * 60);
        setMode('work');
        localStorage.removeItem('pomodoroTime');
        localStorage.removeItem('pomodoroEndTime');
    };

    const handleStartBreak = () => {
        setIsRunning(true);
        setSecondsLeft(mode === 'shortBreak' ? 5 * 60 : 15 * 60);
    };

    return (
        <div className='goal_geral_tela'>
            <div
                key={key}
                onMouseEnter={() => setHoveredIndex(key)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ padding: '10px', display: 'inline-block' }}
                onClick={handleModal}
            >
                {hoveredIndex === key ? (
                    <div>
                        <button>Iniciar agora!</button>
                    </div>
                ) : (
                    <div><button>Pomodoro</button></div>
                )}
            </div>
            <Modal show={showModal} onHide={handleClose} centered size="xl" dialogClassName="custom-modal">
                <Modal.Header>
                    <Modal.Title><h1 className='modal_title'>{goal_name}</h1></Modal.Title>
                    <IoMdClose onClick={handleClose} className='close_button' />
                </Modal.Header>
                <Modal.Body>
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
                            {isRunning ? 
                            <div className='Pomodoro_running'>
                                <div className={styles.pomodoroTimer}>
                                    <h2 className={styles.title}>{mode === 'work' ? 'Hora de se concentrar!' : mode === 'shortBreak' ? 'Descanso Curto' : 'Descanso Longo'}</h2>
                                    <div className={styles.timer}>
                                        {timerVisible ? <>{formatTime(secondsLeft)}</> : <></>}
                                        {timerVisible ? <img className='pomodoro_eye_close' onClick={handleInvisibleTime} width="50" height="50" src="https://img.icons8.com/fluency-systems-filled/50/visible.png" alt="visible"/> :
                                        <img className='pomodoro_eye_close' onClick={handleInvisibleTime} width="60" height="60" src="https://img.icons8.com/ios-glyphs/60/closed-eye--v2.png" alt="closed-eye--v2"/>}
                                    </div>
                                    <button onClick={handleStartPause}>
                                        {isRunning ? 'Voltar' : ''}
                                    </button>
                                </div>
                            </div> 
                            : <></>}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default PomodoroModel;
