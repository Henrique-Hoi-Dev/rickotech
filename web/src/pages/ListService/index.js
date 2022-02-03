import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as moment from 'moment';

import { Container } from './styles';
import Header from '../../components/HeaderListAndRegister';

import { findAllServiceRequest } from '../../store/modules/servicos/actions';

const ListSales = ({ servicoList, handlerRemoveSales }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function onLoad() {
      dispatch(findAllServiceRequest());
    }
    onLoad();
  }, [dispatch]);

  //formatção do preço do produto
  function currencyFormat(num) {
    if (num) {
      return (
        'R$' +
        parseFloat(num)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      );
    }
  }

  return (
    <Container>
      <Header  title="Todos os serviços"/>
      <div className="header-main">
        <form className="form-table">
          <table className="table-list">
            <thead>
              <tr className="table-title">
                <td>Tipo de serviço</td>
                <td>Valor serviço</td>
                <td>Data do serviço</td>
              </tr>
            </thead>
            <tbody>
              {[].concat(servicoList).map((servico, i) => (
                <tr key={i} value={servico.id}>
                  <td>{servico.name}</td>
                  <td>{currencyFormat(servico.valor)}</td>
                  <td>{moment(servico.data_serviço).format('DD/MM/YYYY')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    servicoList: state.servicos.servicoList ? state.servicos.servicoList : [],
  };
};

export default connect(mapStateToProps)(ListSales);
