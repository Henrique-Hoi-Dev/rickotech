import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
    background-color: #4D4C4C;
 }
  
  body, input, button {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

`;
