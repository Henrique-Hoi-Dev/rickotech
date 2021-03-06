import styled from 'styled-components';

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #8945de;

  .header {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    padding: 1.6rem 0;
    margin: 1rem auto -5rem;

    a {
      height: 3.2rem;
      transition: opacity 0.2s;

      :hover {
        opacity: 0.6;
      }
    }
  }

  .header-content {
    width: 90%;
    margin: 0 auto;
    position: relative;
    margin: 3.2rem auto;

    a {
      font: 700 3.6rem Archivo;
      line-height: 4.2rem;
      color: #d4c2ff;
    }

    h2 {
      font: 600 3.1rem Archivo;
      line-height: 4.2rem;
      color: #ffffff;
    }
  }
`;
