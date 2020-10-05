import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 5.4rem;
    font: 1.6rem Archivo;
    color: ${props => props.theme.colors.themeColors.text.dark};
  }
`;
