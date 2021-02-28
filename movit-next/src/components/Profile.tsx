import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

interface profileProps {
    gitNick: string;
}

export function Profile(props: profileProps) {
    const {level} = useContext(ChallengesContext);
    const picture = `https://github.com/${ props.gitNick.replace(" ", "") }.png`;

    return (
        <div className={styles.profileContainer}>
        <img src={picture} alt={props.gitNick}/>
            <div>
                <strong>{props.gitNick}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}