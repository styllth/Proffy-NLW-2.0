import React, { useContext, useState, FormEvent } from 'react';
import { ThemeContext } from 'styled-components';
import { rgba } from 'polished';

import { useAuth } from '../../hooks/useAuth';
import { useLoad } from '../../hooks/useLoad';

import Input from '../../components/Input';
import Text from '../../components/Text';

import { Container, Title, Content, Button } from './styles';
import api from '@proffy/axios-config';

const SingIn: React.FC = () => {
  const { setLoad } = useLoad();
  const { signIn } = useAuth();
  const theme = useContext(ThemeContext).colors;
  const $ = (elem: string): HTMLElement | null =>
    window.document.querySelector<HTMLElement>(elem);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');

  const handleFormPanelTwo = async () => {
    const formPanelTwo = $('.form-panel.two');
    const panelTwo = formPanelTwo?.scrollHeight;
    const Form = $('.form');
    const formHeight = Form?.clientHeight;

    $('.form-toggle')?.classList.add('visible');
    $('.form-panel.one')?.classList.add('hidden');
    $('.form-panel.two')?.classList.add('active');

    if (Form) {
      Form.animate(
        {
          height: [`${formHeight}px`, `${panelTwo}px`]
        },
        {
          duration: 1000, // number in ms [this would be equiv of your speed].
          easing: 'ease-in-out',
          iterations: 1 // infinity or a number.
          // fill: ''
        }
      );

      Form.style.height = `${panelTwo}px`;
    }
  };
  const handleToggle = () => {
    const formPanelOne = $('.form-panel.one');
    const panelOne = formPanelOne?.clientHeight;
    const Form = $('.form');
    const formHeight = Form?.clientHeight;

    $('.form-toggle')?.classList.remove('visible');
    $('.form-panel.one')?.classList.remove('hidden');
    $('.form-panel.two')?.classList.remove('active');

    if (Form) {
      Form.animate(
        {
          height: [`${formHeight}px`, `${panelOne}px`]
        },
        {
          duration: 500, // number in ms [this would be equiv of your speed].
          direction: 'normal',
          easing: 'ease-in-out',
          iterations: 1 // infinity or a number.
          // fill: ''
        }
      );

      Form.style.height = `${panelOne}px`;
    }
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signIn('/authenticate', {
        email: loginEmail,
        password: loginPassword
      });

      setLoad(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    let data = { name, email: registerEmail, password: registerPassword };

    await api.post('/register/', data).then(response => {
      if (response.status === 400) {
        console.log(response.data.error);
      }

      signIn('/authenticate/', {
        email: registerEmail,
        password: registerPassword
      });

      setLoad(true);
    });

    return false;
  };

  return (
    <Container>
      <Title>
        <Text
          text="Proffy"
          size={8}
          weight={800}
          color={theme.themeColors.primary.normal}
        />
        <Text
          text="Sua plataforma de estudos online"
          size={2}
          color={rgba(theme.themeColors.text.normal, 0.6)}
        />
      </Title>

      <Content className="form">
        <div className="form-toggle" onClick={handleToggle}></div>
        <div className="form-panel one">
          <div className="form-header">
            <Text
              text="Fazer Login"
              size={3}
              color={theme.themeColors.primary.dark}
              transform="uppercase"
              align="center"
            />
          </div>
          <div className="form-content">
            <form onSubmit={handleSignIn}>
              <Input
                id="login-email"
                type="email"
                name="email"
                label="E-mail"
                required
                value={loginEmail}
                onChange={e => {
                  setLoginEmail(e.target.value);
                }}
              />
              <Input
                id="login-password"
                type="password"
                name="password"
                label="password"
                required
                value={loginPassword}
                onChange={e => {
                  setLoginPassword(e.target.value);
                }}
              />
              <div className="form-remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Lembrar-me</label>
                <a className="form-recovery" href="/#">
                  Esqueci minha senha
                </a>
              </div>
              <Button type="submit">Entrar</Button>
            </form>
          </div>
        </div>
        <div className="form-panel two" onClick={handleFormPanelTwo}>
          <div className="form-header">
            <Text
              text="Cadastre-se"
              size={3}
              color={theme.white}
              transform="uppercase"
              align="center"
            />
          </div>
          <div className="form-content">
            <form onSubmit={handleRegister}>
              <Input
                type="text"
                name="name"
                label="Nome Completo"
                required
                value={name}
                onChange={e => {
                  setName(e.target.value);
                }}
              />

              <Input
                type="email"
                name="email"
                label="E-mail"
                required
                value={registerEmail}
                onChange={e => {
                  setRegisterEmail(e.target.value);
                }}
              />

              <Input
                type="password"
                name="password"
                label="password"
                required
                value={registerPassword}
                onChange={e => {
                  setRegisterPassword(e.target.value);
                }}
              />

              <Button type="submit">Cadastrar</Button>
            </form>
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default SingIn;
