import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;

  .header-main {
    background: #353535;
    max-width: 70rem;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    border-radius: 0.8rem;
    margin: 15px auto 3.2rem;
    padding-top: 3rem;
    overflow: hidden;
  }

  .form-table {
    padding: 0 2.4rem;

    table {
      background-color: #4d4c4c;
      box-sizing: border-box;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);

      td {
        max-height: 5px;
        border-bottom: 0.2rem solid #8945de;
      }
    }

    button {
      background: none;
      border: 0;
      font-size: 28px;
      cursor: pointer;
    }
  }

  .table-list {
    width: 100%;
    border-radius: 0.8rem;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 2.5rem;

    padding: 1.6rem;
    font: 1.1rem Archivo;
    color: #9c98a6;
    font-weight: bold;

    td,
    th {
      padding: 0.5rem;
      text-align: center;
    }
  }

  @media screen and (max-width: 600px) {
  }
`;
