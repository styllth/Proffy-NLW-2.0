import styled from 'styled-components';
import { darken, rgba } from 'polished';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  max-width: 1100px;
  min-height: 100%;
  height: 100%;

  background: ${({ theme }) => theme.colors.themeColors.tertiary};
  margin: 0 auto;
  padding: 10px 10px 0 10px;

  flex: 1;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 1100px) {
    padding: 50px 30px 50px 30px;
    flex-flow: row;
  }
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  padding: 10px;

  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 2rem;

  @media (min-width: 780px) {
    align-items: justify;
  }
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  height: auto;

  max-width: 600px;

  background: ${({ theme }) => theme.colors.themeColors.tertiary};
  border-radius: 5px;
  box-shadow: 0px 0px 25px 0px
    ${({ theme }) => darken(0.2, theme.colors.themeColors.tertiary)};
  box-sizing: border-box;

  overflow: hidden;
  z-index: 15;

  .form-remember {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
    line-height: 14px;
    color: ${({ theme }) => theme.colors.themeColors.primary.normal};
    width: auto;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;

    input[type='checkbox'] {
      display: none;
    }

    input[type='checkbox'] + label {
      position: relative;
      display: flex;
      align-items: center;
    }

    input[type='checkbox'] + label::before {
      content: '';
      width: 2rem;
      height: 2rem;
      border-radius: 5px;
      border: 1px solid
        ${props => darken(0.1, props.theme.colors.themeColors.tertiary)};
      box-shadow: 0px 13px 7px -10px ${props => rgba(darken(0.1, props.theme.colors.themeColors.tertiary), 0.4)};
      display: inline-block;
      box-sizing: border-box;
      margin-right: 2rem;
    }

    input[type='checkbox']:checked + label::after {
      content: '';
      position: absolute;
      left: 10px;
      bottom: 5px;
      width: 8px;
      height: 20px;
      border-right: solid 5px ${({ theme }) => theme.colors.green};
      border-bottom: solid 5px ${({ theme }) => theme.colors.green};
      transform: rotate(45deg);
    }
  }

  .form-recovery {
    display: flex;
    width: auto;

    color: ${({ theme }) => theme.colors.themeColors.primary.normal};
    font-size: 12px;
    text-decoration: none;

    justify-content: flex-end;
  }

  .form-toggle {
    z-index: 10;
    position: absolute;
    top: 15px;
    right: 5px;
    background: ${({ theme }) => theme.colors.white};
    width: 40px;
    height: 40px;
    border-radius: 100%;
    transform-origin: center;
    transform: translate(0, -25%) scale(0);
    transition: all 0.3s ease;
    -webkit-transform-origin: center;
    -webkit-transform: translate(0, -25%) scale(0);
    -webkit-transition: all 0.3s ease;
    opacity: 0;
    cursor: pointer;
  }

  .form-toggle:before,
  .form-toggle:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 4px;
    background: ${({ theme }) => theme.colors.themeColors.primary.normal};
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }

  .form-toggle:before {
    transform: translate(-50%, -50%) rotate(45deg);
    -webkit-transform: translate(-50%, -50%) rotate(45deg);
  }

  .form-toggle:after {
    transform: translate(-50%, -50%) rotate(-45deg);
    -webkit-transform: translate(-50%, -50%) rotate(-45deg);
  }

  .form-toggle.visible {
    transform: translate(0, -25%) scale(1);
    -webkit-transform: translate(0, -25%) scale(1);
    opacity: 1;
  }

  .form-panel {
    /* padding: 60px calc(5% + 60px) 60px 60px; */
    padding: 60px calc(5% + 30px) 60px 30px;
    box-sizing: border-box;

    @media screen and (min-width: 450px) {
      padding: 60px calc(5% + 30px) 60px 30px;
    }
  }

  .form-panel.one:before {
    content: '';
    display: block;
    opacity: 0;
    visibility: hidden;
    -webkit-transition: 0.3s ease;
    transition: 0.3s ease;
  }

  .form-panel.one.hidden:before {
    display: block;
    opacity: 1;
    visibility: visible;
  }

  .two {
    label {
      ${({ theme }) => theme.colors.themeColors.text.normal};
    }

    input {
      background: ${({ theme }) => theme.colors.opaque};
      color: ${({ theme }) => theme.colors.white};
      border-color: ${({ theme }) =>
        rgba(theme.colors.themeColors.primary.dark, 0.8)};
      box-shadow: 0px 13px 7px -10px ${({ theme }) => rgba(theme.colors.themeColors.primary.dark, 0.4)};
    }

    button {
      background: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.themeColors.primary.normal};
    }

    .input-block:focus-within::after {
      background: ${({ theme }) => theme.colors.white}!important;
    }
  }

  .form-panel.two {
    z-index: 5;
    position: absolute;
    top: 0;
    left: 95%;
    background: ${({ theme }) => theme.colors.themeColors.primary.normal};
    padding: 30px calc(5% + 30px) 30px 30px;
    width: 100%;
    min-height: 100%;
    -webkit-transition: 0.3s ease;
    transition: 0.3s ease;
    cursor: pointer;

    @media screen and (min-width: 450px) {
      padding: 60px calc(10% + 60px) 60px 60px;
    }
  }

  .form-panel.two:before,
  .form-panel.two:after {
    content: '';
    display: block;
    position: absolute;
    top: 60px;
    left: 1.5%;
    background: ${({ theme }) => theme.colors.white};
    height: 30px;
    width: 2px;
    -webkit-transition: 0.3s ease;
    transition: 0.3s ease;
  }

  .form-panel.two:after {
    left: 3%;
  }

  .form-panel.two:hover {
    left: 93%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .form-panel.two:hover:before,
  .form-panel.two:hover:after {
    opacity: 0;
  }

  .form-panel.two.active {
    left: 10%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    cursor: default;
  }

  .form-panel.two.active:before,
  .form-panel.two.active:after {
    opacity: 0;
  }

  .form-header {
    margin: 0 0 40px;
  }

  .form-header h1 {
    padding: 4px 0;
    color: ${({ theme }) => theme.colors.themeColors.primary.normal};
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .two .form-header h1 {
    position: relative;
    z-index: 40;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 5.6rem;
  background: ${props => props.theme.colors.themeColors.primary.normal};
  color: ${props => props.theme.colors.white};
  border: 0;
  border-radius: 0.8rem;
  cursor: pointer;
  font: 700 2rem Archivo;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;
  margin-top: 3.2rem;

  &:hover {
    background: ${props => props.theme.colors.themeColors.primary.light};
  }
`;
