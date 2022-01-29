import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #353535;
  max-width: 54rem;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0.8rem;

  margin: -3rem auto 2rem;
  padding: 3rem;
  overflow: hidden;
  display: flex;

  flex-direction: column;
  align-items: stretch;

  form {
    display: grid; 
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100px 1fr;
    grid-template-areas:
    'data valor-open'
    'but but';

    .data {
      grid-area: data;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    .valor-open {
      grid-area: valor-open;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .but{
      grid-area: but;
      margin-top: 45px;
      display: flex;
      flex-direction: row;
    }
    label {
      padding: 0.5rem;
      font-weight: bold;
      font-size: 20px;
      color: #9c98a6;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
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
    font-size: 17px;
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
`;

export const List = styled.div`
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0.8rem;

  margin: -4rem auto 2rem;
  padding: 3rem;
  overflow: hidden;
  display: flex;

  flex-direction: column;
  align-items: stretch;

  .table-list {
    width: 100%;
    background: #353535;
    border-radius: 0.8rem;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);

    padding: 1.6rem;
    font: 16px Archivo;
    color: #9c98a6;
    font-weight: bold;

    td {
      max-height: 5px;
      border-bottom: 0.2rem solid #8945de;
    } 

    td,
    th {
      padding: 0.5rem;
      text-align: center;
    }
  }

`;
