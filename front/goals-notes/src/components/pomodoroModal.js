import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";
import './Style/goals_container.css';
import styles from './Style/pomodoro.module.css';
import { UpdateGoal } from '../services/goals_request';
import CapMessage from './CapMessages';

function PomodoroModel({ id, key, goal_name }) {
    const [showModal, setShowModal] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
    const [cycles, setCycles] = useState(0);
    const capMessageRef = useRef();

    async function pomodoro_cycle_register() {
        const goal_json = { pomodoro_cycles: cycles };
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
    };

    const handleClose = () => {
        handleReset();
        setShowModal(false);
        console.log(`fechou com ${cycles} ciclos`);
        pomodoro_cycle_register();
        setCycles(0);
    };

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
        setSecondsLeft(25 * 60);
        setMode('work');
    };

    return (
        <div>
            <div
                key={key}
                onMouseEnter={() => setHoveredIndex(key)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ padding: '10px', display: 'inline-block' }}
                onClick={handleModal}
            >
                {hoveredIndex === key ? (
                    <div style={{ marginTop: '10px' }}>
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
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <CapMessage ref={capMessageRef} message={`Você realizou ${cycles} ciclo(s) completamente!`} id_user={id} />
        </div>
    );
}

export default PomodoroModel;
