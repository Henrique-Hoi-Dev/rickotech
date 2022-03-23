import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  .cards {
    min-width: 300px;
    margin: 12px;
    padding: 15px;

    color:  #9c98a6;

    border-radius: 8px;

    box-shadow: 0px 4px 4px rgb(0 0 0 / 50%);
    background: #353535;

    display: flex;
    flex-direction: column;
    justify-content: center;
    
    strong {
      margin-top: 10px;
    }
  }
`