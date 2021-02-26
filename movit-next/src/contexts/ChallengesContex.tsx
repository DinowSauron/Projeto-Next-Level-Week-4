import { createContext, useState, ReactNode } from 'react';
import challenges from "../../challenges.json"

interface ChallengesProviderProps {
    children: ReactNode;
}

interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContexData {
    level: number, 
    levelUp: () => void,
    startNewChallenge: () => void,
    activeChallenge: Challenge,
    resetChallenge: () => void,
    experienceToNextLevel: number,
    currentExperience: number,
    challengesCompleted: number
}

export const ChallengesContex = createContext({} as ChallengesContexData);

export function ChallengesProvider({children} : ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
  
    function levelUp(){
      setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    return (
        <ChallengesContex.Provider value={
            {level, levelUp,
            startNewChallenge,
            resetChallenge,
            activeChallenge,
            currentExperience,
            experienceToNextLevel,
            challengesCompleted}
        }>
            {children}
        </ChallengesContex.Provider>
    );
}