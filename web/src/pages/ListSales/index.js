import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as moment from 'moment';

import { Container } from './styles';
import Header from '../../components/HeaderListAndRegister';
import { FcEmptyTrash } from 'react-icons/fc';

import {
  findAllSalesRequest,
  deleteSalesRequest,
} from '../../store/modules/sales/actions';

const ListSales = ({ salesList, handlerRemoveSales }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function onLoad() {
      dispatch(findAllSalesRequest());
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
      <Header  title="Todos as vendas"/>
      <div className="header-main">
        <form className="form-table">
          <table className="table-list">
            <thead>
              <tr className="table-title">
                <td>Produto Nome</td>
                <td>Produto Valor</td>
                <td>Desconto</td>
                <td>Data da Venda</td>
                <td>Tipo Pagamento</td>
                <td>Excluir</td>
              </tr>
            </thead>
            <tbody>
              {[].concat(salesList).map((sales, i) => (
                <tr key={i} value={sales.id}>
                  <td>{sales.name}</td>
                  <td>{currencyFormat(sales.valor_total)}</td>
                  <td>{sales.desconto}%</td>
                  <td>{moment(sales.data_registro).format('DD/MM/YYYY')}</td>
                  <td>{sales.tipo_pagamento}</td>
                  <td>
                    <button onClick={(e) => handlerRemoveSales(e, sales.id)}>
                      <FcEmptyTrash />
                    </button>
                  </td>
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
    salesList: state.sales.salesList ? state.sales.salesList : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlerRemoveSales: async (e, id) => {
      e.preventDefault();
      const confirm = window.confirm(
        'Tem certeza que deseja desfazer essa venda?'
      );
      if (confirm) {
        dispatch(deleteSalesRequest(id));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSales);
