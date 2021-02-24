import styles from '../styles/components/Profile.module.css';

interface profileProps {
    gitNick: string;
}

export function Profile(props: profileProps) {
    const picture = "https://github.com/" + props.gitNick.replace(" ", "") + ".png";

    return (
        <div className={styles.profileContainer}>
        <img src={picture} alt={props.gitNick}/>
            <div>
                <strong>{props.gitNick}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 1
                </p>
            </div>
        </div>
    );
}