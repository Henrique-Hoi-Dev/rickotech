import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;

    .but {
      display: flex;
      justify-content: space-between;

    }
  }

  h2 {
    padding: 0.5rem;
    font-weight: bold;

    color: #9c98a6;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  }

  input {
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

  span {
    color: #ff0000;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 10px 0 20px;
  }

  button {
    margin: 5px 0 0;
    width: 250px;
    height: 44px;
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

  a {
    color: #000;
    margin-top: 15px;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`;
