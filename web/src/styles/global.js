import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

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


    ::-webkit-scrollbar {
      width: 1px;
      height: 10px;
    }
    
  }

  body {
    -webkit-font-smoothing: antialiased !important;
    background-color: #4D4C4C;

      .MuiPaper-root  {
      background-color: #4D4C4C;
      font-weight: bold;
      color: #9c98a6;
    } 
}
  
  body, input, button {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;

  }

  button {
    cursor: pointer;
  }

`;
