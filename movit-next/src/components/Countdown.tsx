import { ChallengesContex } from '../contexts/ChallengesContex';
import { useState, useEffect, useContext} from 'react';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
    const { startNewChallenge } = useContext(ChallengesContex);


    const [time, setTime] = useState(.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
    const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");


    function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setTime(25*60)
        setIsActive(false);
    }

    useEffect(() => {
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])


    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button disabled className={styles.countdownButton} onClick={resetCountdown}>
                    Ciclo Encerrado
                </button>
            ) : (
                <>
                {
                isActive ? (
                    <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>
                        Abandonar ciclo
                    </button>
                ) : (
                    <button type="button" className={`${styles.countdownButton}`} onClick={startCountdown}>
                        Iniciar Ciclo
                    </button>
                )}
                </>
            ) }

            
        </div>
    );
}