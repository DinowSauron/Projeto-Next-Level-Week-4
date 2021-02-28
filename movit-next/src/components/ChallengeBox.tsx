import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);
    
    function handleChallengeSucceeded() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
            <div className={styles.challengeActive}>
                <header>Ganhe {activeChallenge.amount} xp</header>

                <main>
                    <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                    <strong>Novo Desafio</strong>
                    <p>{activeChallenge.description}</p>
                </main>

                <footer>
                    <button type="button" onClick={handleChallengeFailed} 
                    className={styles.challengeFailedButton}>Dispensar</button>

                    <button type="button" onClick={handleChallengeSucceeded} 
                    className={styles.challengeSucceededButton}>Concluir</button>
                </footer>
            </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <span>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        <p>Avance de level completando desafios!</p>
                    </span>
                 </div>
            )}
        </div>
    );
}