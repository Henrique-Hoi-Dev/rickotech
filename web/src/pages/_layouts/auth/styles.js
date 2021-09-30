import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 400px;
  height: auto;

  padding: 2rem;
  text-align: center;

  border-radius: 0.8rem;
  background: rgba(0, 0, 0, 0.5);

  img {
    width: 150px;
    height: 200px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }

  label {
    color: #fff;

    align-self: flex-start;
    margin: 0 0 1rem;
  }

  input {
    width: 100%;
    background: #f8f8fc;
    border: 1px solid #e6e6f0;
    font: 1rem Archivo;

    border-radius: 0.2rem;
    height: 2.2rem;
    padding: 0 1rem;
    margin: 0 0 1rem;
  }

  span {
    color: #ff0000;
    align-self: flex-start;
    margin: 0 0 1rem;
  }

  button {
    margin: 5px 0 0;
    height: 44px;
    background: #6842c2;
    font-weight: bold;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
      color: ${darken(0.03, '#fff')};
      background: ${darken(0.03, '#6842c2')};
    }
  }

  a {
    color: #fff;
    margin-top: 15px;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    opacity: 0.8;

    &:hover {
      opacity: 2;
    }
  }

  @media (min-width: 1000px) {
    form {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
    }

    input {
      width: 100%;
      background: #f8f8fc;
      border: 1px solid #e6e6f0;
      font: 1rem Archivo;

      border-radius: 0.6rem;
      height: 2.5rem;
      padding: 0 1.5rem;
      margin: 0 0 1rem;
    }

    span {
      color: #ff0000;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #8398c9;
      font-weight: bold;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#8398c9')};
      }
    }

    a {
      color: #ffffff;
      margin-top: 15px;
      text-decoration: none;
      font-weight: bold;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
