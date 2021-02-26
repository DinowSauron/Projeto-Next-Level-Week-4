import { useContext } from 'react';
import { ChallengesContex } from '../contexts/ChallengesContex';
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges(){
    const {challengesCompleted} = useContext(ChallengesContex);
    
    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}