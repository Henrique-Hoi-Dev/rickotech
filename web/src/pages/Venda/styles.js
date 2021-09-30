import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #353535;
  max-width: 50rem;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0.8rem;

  margin: 2rem auto 2rem;
  padding: 3rem;
  overflow: hidden;

  form {
    display: grid; 
    grid-template-columns: 1fr 2fr;
    /* grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'valor-parcela valor-parcela'
      'parcelas parcelas'; */

    h2 {
      margin-left: 1rem;
      padding: 0.5rem;
      font-weight: bold;

      color: #9c98a6;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    }
  }

  a {
    text-align: center;
    text-decoration: none;
    margin: 5px 0 0;
    height: 3rem;
    width: 15rem;
    background: #8945de;
    font-weight: bold;
    margin-bottom: 1rem;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#8945de')};
    }
  }

  button {
    margin: 5px 0 0;
    height: 3rem;
    width: 15rem;
    background: #8945de;
    font-weight: bold;
    margin-bottom: 1rem;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#8945de')};
    }
  }

  div {
    display: flex;
    justify-content: space-between;
  }

  input {
    max-width: 15rem;
    background: rgba(0, 0, 0, 0.1);
    padding: 0 15px;
    font: 1rem Archivo;
    border-radius: 0.5rem;
    height: 2.2rem;
    padding: 0 1rem;
    margin: 0 0 1rem;
    border: 2px solid #8945de;
    font-weight: bold;
    color: #9c98a6;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  select {
    font: 1rem Archivo;
    border-radius: 0.5rem;
    height: 2.2rem;
    padding: 0 1rem;
    margin: 0 0 1rem;
    border: 2px solid #8945de;
    font-weight: bold;
    color: #9c98a6;
    background: rgba(0, 0, 0, 0.1);

    ::-webkit-scrollbar {
      width: 1px;
      height: 10px;
    }
  }
`;
