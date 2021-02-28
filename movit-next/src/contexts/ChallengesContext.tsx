import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from "../../challenges.json"
import { LevelUpModal } from '../components/levelUpModal';

interface ChallengesProviderProps {
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengesCompleted: number
}

interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContextData {
    levelUp: () => void,
    startNewChallenge: () => void,
    completeChallenge: () => void,
    resetChallenge: () => void,
    closeLevelUpModal: () => void,
    level: number, 
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    currentExperience: number,
    challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest} : ChallengesProviderProps) { 
    // o ...rest pega todas os atributos que não são os indicados e coloca em um array


    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);


    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    //parametro vazio será executado apenas 1x no inicio
    useEffect(() => {
        //https://developer.mozilla.org/pt-BR/docs/Web/API/Notification
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);
  
    function levelUp(){
      setLevel(level + 1);
      setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
      setIsLevelUpModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio("/notification.mp3").play();

        if(Notification.permission === "granted"){
            new Notification("Ciclo Finalizado!", {
                body: `Novo Desafio valendo ${challenge.amount}XP !!!`,
                icon: '/favicon.png'
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        // let it change
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider value={
            {level, levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal,
            activeChallenge,
            currentExperience,
            experienceToNextLevel,
            challengesCompleted}
        }>
            {children}
            { isLevelUpModalOpen ? <LevelUpModal/> : null}
        </ChallengesContext.Provider>
    );
}