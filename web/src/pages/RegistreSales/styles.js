import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #353535;
  max-width: 50rem;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0.8rem;

  margin: -3rem auto 2rem;
  padding: 3rem;
  overflow: hidden;
  display: flex;

  flex-direction: column;
  align-items: stretch;

  .titulo {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    h1 {
      padding: 0.5rem;
      font-weight: bold;

      color: #9c98a6;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    }
  }

  form {
    display: grid; 
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
    'statos tipo-venda'
    'tipo-venda-1 final'
    'but but';

    .statos {
      grid-area: statos;
      display: flex;
      flex-direction: column;
    }
    .tipo-venda {
      grid-area: tipo-venda;
      display: flex;
      flex-direction: column;
    }
    .tipo-venda-1 {
      grid-area: tipo-venda-1;
      display: flex;
      flex-direction: column;
    }
    .final{
      grid-area: final;
      display: flex;
      flex-direction: column;
    }
    .but{
      grid-area: but;
      display: flex;
      flex-direction: row;

      .cancela {
        margin-left: 15px;
        background: red;
      }
    }
    label {
      padding: 0.5rem;
      font: 700 1.4rem Archivo;

      color: #9c98a6;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    }

    p {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      line-height: 2.4rem;
      color: #9c98a6;
    } 

    svg {
      margin-right: 1rem;
    }
  }

  a {
    text-align: center;
    text-decoration: none;
    margin: 5px 0 0;
    color: #ffff;
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
    margin: 5px 18px 0;
    height: 3rem;
    width: 12rem;
    background: #8945de;
    font-weight: bold;
    margin-bottom: 1rem;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#8945de')};
      transform: scale(1.1);
      transition: all 0.5s;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
  }

  input {
    min-width: 15rem;
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
    min-width: 15rem;
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
