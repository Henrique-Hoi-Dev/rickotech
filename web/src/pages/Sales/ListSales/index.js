import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Container } from './styles';
import { FcEmptyTrash } from 'react-icons/fc';

import {
  findAllSalesRequest,
  deleteSalesRequest,
} from '../../../store/modules/sales/actions';

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
      <div className="header-main">
        <form className="form-table">
          <table className="table-list">
            <thead>
              <tr className="table-title">
                <td>Nome Produto</td>
                <td>Quantidade</td>
                <td>Valor Produto</td>
                <td>Desconto</td>
                <td>Status Venda</td>
              </tr>
            </thead>
            <tbody>
              {[].concat(salesList).map((sales, i) => (
                <tr key={i} value={sales.id}>
                  <td>{sales.name_product}</td>
                  <td>{sales.product_quantity}</td>
                  <td>{currencyFormat(sales.price_total || [0])}</td>
                  <td>{sales.discount}%</td>
                  <td>{sales.status}</td>
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
    salesList: state.sales.salesList.responseData ? state.sales.salesList.responseData : [],
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
