import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as moment from 'moment';
import { FcEmptyTrash, FcSalesPerformance } from 'react-icons/fc';
import { BiEdit } from 'react-icons/bi';

import { Container } from './styles';
import Header from '../../components/HeaderListAndRegister';
import { Link } from 'react-router-dom';
import {
  findAllCancelAccountRequest,
  deleteAccountRequest,
} from '../../store/modules/account/actions';

const ListCancelAccounts = ({ accountList, handlerRemoveAccount }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function onLoad() {
      dispatch(findAllCancelAccountRequest());
    }
    onLoad();
  }, [dispatch]);

  //formatção do preço do produto
  // function currencyFormat(num) {
  //   if (num) {
  //     return (
  //       'R$' +
  //       parseFloat(num)
  //         .toFixed(2)
  //         .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  //     );
  //   }
  // }

  return (
    <Container>
      <Header title="Todas dividas canceladas"/>
      <div className="header-main">
        <form className="form-table">
          <table className="table-list">
            <thead>
              <tr className="table-title">
                <td>Nome</td>
                <td>Data Registro</td>
                <td>status</td>
                <td>Editar</td>
                <td>Excluir</td>
                <td>Vender</td>
              </tr>
            </thead>
            <tbody>
              {[].concat(accountList).map((contas, i) => (
                <tr key={i} value={contas.id}>
                  <td>{contas.name}</td>
                  <td>{moment(contas.data_vencimento).format('DD-MM-YYYY')}</td>
                  <td>{contas.status}</td>
                  <td>
                    <button>
                      <Link to={`/product/${contas.id}`}>
                        <BiEdit />
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handlerRemoveAccount(e, contas.id)}
                    >
                      <FcEmptyTrash />
                    </button>
                  </td>
                  <td>
                    <button >
                      <Link to={`/venda/${contas.id}`}>
                        < FcSalesPerformance/>
                      </Link>
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
  console.log(state)
  return {
    accountList: state.account.accountList ? state.account.accountList : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlerRemoveAccount: async (e, id) => {
      e.preventDefault();
      const confirm = window.confirm(
        'Tem certeza que deseja remover esse produto?'
      );
      if (confirm) {
        dispatch(deleteAccountRequest(id));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCancelAccounts);
