import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div` 
  font-size: 0.8rem;

  }

  .header-main {
    background: #353535;
    width: 100%;
    max-width: 50rem;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    border-radius: 0.8rem;
    margin: -3rem auto 3.2rem;
    padding-top: 3rem;
    overflow: hidden;   

  input {
    font: 1rem Archivo;
    border-radius: 0.5rem;
    height: 2.2rem;
    padding: 0 1rem;
    margin: 0 0 1rem;
    border: 2px solid #8945de;
    font-weight: bold;
    color: #9c98a6;

  }

  select {  
    font: 1rem Archivo;
    border-radius: 0.5rem;
    width: 13.5rem;
    height: 2.2rem;
    padding: 0 1rem;
    margin: 0 0 1rem;
    border: 2px solid #8945de;
    font-weight: bold;
    color: #9c98a6;
  }

  .form-input {
    border: 2;
    padding: 0 2.4rem;
    margin-top: 0.1rem;
   }
  }

    button {
      background: none;
      border: 0;
      color: #6842c2;
      font: 700 1.6rem Archivo;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: ${darken(0.03, '#6842c2')};
      }
  }

  .header-title {


    label {
      font: 700 1.4rem Archivo;
      color: #8945de;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-bottom: 1rem;
      margin-top: 0.5rem;
    }

    textarea {
      width: 100%;
      min-height: 4rem;
      margin-top: 0.8rem;
      border-radius: 0.8rem;
      background: #f8f8fc;
      border: 1px solid #e6e6f0;
      outline: 0;
      resize: vertical;
      padding: 1.2rem 1.6rem;
      font: 1.2rem Archivo;
      font-weight: bold;
    }
    p {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      line-height: 2.4rem;
      color: #9c98a6;
    }

    span {
      color: #ff0000;
      margin: 0 0 0 15px;
      font-weight: bold;
    }

    main {
      margin: 3.2rem auto;
      width: 90%;
    }

    footer {
      padding: 2rem ;
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        margin-right: 1rem;
      }
    }
  }  

  @media (min-width: 1100px) {
    #container-input {
      max-width: 1100px;

      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 5px 455px 1fr;
      grid-template-areas:
        'name name name'
        'campo2  campo4 campo3'
        'campo5 campo5 campo5'
        'button button button';
    }

    .name-campo {
      grid-area: name;    
    }

    .campo2 {
      grid-area: campo2;
    }
    .campo3 {
      grid-area: campo3;

      ul {
        display: flex;
        flex-direction: column;
      }
    }
    .campo4 {
      grid-area: campo4;
    }
    .campo5 {
      grid-area: campo5;
    }
    .buttons-container {
      grid-area: button;
    }  
`;
