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
      width: 160px;
      height: 120px;
      margin-top: 30px;
      background-color: #353535;
      font-weight: bold;
      color: #9c98a6;

      .css-2s90m6-MuiAvatar-root {
        background: none;
      }
      .css-cveggr-MuiListItemIcon-root {
        min-width: 40px;
      }
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
