import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import { FcEmptyTrash } from 'react-icons/fc';
import { BiEdit } from 'react-icons/bi';

import {
  findAllSalesRequest,
  deleteSalesRequest,
} from '../../../store/modules/sales/actions';


const ListSales = ({ salesList, handlerRemoveSales }) => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(findAllSalesRequest());
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
                <td>Vendedor</td>
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
                  <td>{sales.user.name}</td>
                  <td>{sales.name_product}</td>
                  <td>{sales.product_quantity || [0]}</td>
                  <td>{currencyFormat(sales.price_total || [0])}</td>
                  <td>{sales.discount}%</td>
                  <td style={{ borderRadius: '8px', color: '#fff',
                               backgroundColor: (sales.status === 'open' && 'green') ||
                                                (sales.status === 'closed' && 'red') || 
                                                (sales.status === 'sold' && 'orange') }}
                      >
                      {(sales.status === 'open' && 'Em Aberto') || 
                       (sales.status === 'closed' && 'Fechado') || 
                       (sales.status === 'sold' && 'Vendido')}</td>
                  <td>
                    <button style={{ 
                      display: (sales.status === 'sold' && 'none') ||
                      (sales.status === 'open' && 'closed' && 'line-through')}}>
                      <Link to={`/editSales/${sales.id}`}>
                        < BiEdit/>
                      </Link>
                    </button>
                  </td>
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

const mapDispatchToProps = (dispatch, state) => {
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
