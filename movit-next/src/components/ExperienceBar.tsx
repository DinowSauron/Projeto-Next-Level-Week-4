import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar(){
    const {currentExperience, experienceToNextLevel} = useContext(ChallengesContext);

    const porcent = ((currentExperience * 100) / experienceToNextLevel) + "%";

    
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: porcent  }}></div>
                <span className={styles.currentExperience} style={{left: porcent}}>
                    {currentExperience}px
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}