import Head  from 'next/head';
import { GetServerSideProps } from 'next';
import React from 'react';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountdownProvider } from '../contexts/CountdownContext';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps{
  level: number,
  currentExperience: number,
  challengesCompleted: number
}


export default function Home(props: HomeProps) {

  //tudo que for passado aqui executa no browser

  // console.log(props)

  return (
    <ChallengesProvider 
    level={props.level} 
    currentExperience={props.currentExperience} 
    challengesCompleted={props.challengesCompleted}>
      
      <div className={styles.container}>
        <ExperienceBar/>
        <Head>
          <title>Inicio | Movit</title>
        </Head>
        
        
        <CountdownProvider>
          <section>
            <div>
              <Profile gitNick="Dinow Sauron"/>
              <CompletedChallenges/> 
              <Countdown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

//essa função PRECISA ter esse nome
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //tudo que se passar aqu iexecuta no next (back-end)

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;


  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted:  Number(challengesCompleted)
    }
  };
}
