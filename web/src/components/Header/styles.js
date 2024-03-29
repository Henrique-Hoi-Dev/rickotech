import styled from 'styled-components';

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #8945de;
  margin-top: 80px;

  .header {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    padding: 1rem 0;
    margin: 1rem auto -5rem;

    .img {
      margin-right: 100px;
    }

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
      color: #ffffff;
    }

    h2 {
      font: 600 3.1rem Archivo;
      line-height: 4.2rem;
      color: #ffffff;
    }
  }
`;
