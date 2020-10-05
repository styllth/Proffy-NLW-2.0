import React, { useState, useEffect } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import api from '@proffy/axios-config';

import { useLoad } from '../../hooks/useLoad';
import Header from './../../components/Header/index';

import {
  PageLanding,
  Head,
  PageLandingContent,
  LogoContainer,
  HeroImage,
  ButtonsContainer,
  TotalConnections,
  Welcome
} from './styles';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';

const Landing: React.FC = () => {
  const { setLoad } = useLoad();
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    setLoad(false);
    api.get('connections').then(response => {
      setTotalConnections(response.data.total);
    });
  }, []);
  return (
    <PageLanding>
      <Header />
      <Head>
        <PageLandingContent>
          <LogoContainer>
            <img src={logoImg} alt="Proffy" />
            <h2>Sua plataforma de estudos online</h2>
          </LogoContainer>

          <HeroImage src={landingImg} alt="Plataforma de estudos" />
        </PageLandingContent>
      </Head>

      <PageLandingContent>
        <Welcome>
          Seja bem-vindo.
          <strong>O que deseja fazer?</strong>
        </Welcome>

        <TotalConnections>
          Total de {totalConnections} conexões já realizadas <AiFillHeart />
        </TotalConnections>

        <ButtonsContainer>
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>
          <Link to="/class/new" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas" />
            Dar aulas
          </Link>
        </ButtonsContainer>
      </PageLandingContent>
    </PageLanding>
  );
};

export default Landing;
