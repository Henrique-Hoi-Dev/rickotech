import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as moment from 'moment';
import { FcEmptyTrash } from 'react-icons/fc';
import { BiEdit } from 'react-icons/bi';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import { Container } from './styles';
import Header from '../../components/HeaderListAndRegister';
import { Link } from 'react-router-dom';
import {
  findAllPendingAccountRequest,
  deleteAccountRequest,
} from '../../store/modules/account/actions';

const ListPendingAccounts = ({ accountList, handlerRemoveAccount }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function onLoad() {
      dispatch(findAllPendingAccountRequest());
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
      <Header title="Todas dividas pendentes"/>
      <div className="header-main">
        <form className="form-table">
      {[].concat(accountList).map((contas, i) => (
         <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ width: '100%' }}>
                <table className="table-list">
                  <thead>
                    <tr className="table-title">
                      <td>Nome</td>
                      <td>Data Registro</td>
                      <td>status</td>
                      <td>Editar</td>
                      <td>Excluir</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={i} value={contas.id}>
                      <td>{contas.name}</td>
                      <td>{moment(contas.data_vencimento).format('DD-MM-YYYY')}</td>
                      <td style={{ color: (contas.status === 'pendente' && 'red') || (contas.status === 'pago' && 'green') || (contas.status === 'cancelado' && 'black')}}>
                        {(contas.status === 'pendente' && 'Pendente') || (contas.status === 'pago' && 'Pago') || (contas.status === 'cancelado' && 'Cancelado')}
                      </td>
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
                    </tr>
                  </tbody>
                </table>
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography sx={{ width: '70%' }}>
                {contas.parcela.map((parcelas, i) => (
                  <table  className="table-list">
                    <thead>
                      <tr className="table-title">
                        <td>Valor</td>
                        <td>N parcela</td>
                        <td>Status</td>
                        <td>Editar</td>
                        <td>Excluir</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{currencyFormat(parcelas.valor)}</td>
                        <td>{parcelas.numero_parcela}</td>
                        <td style={{ color: (parcelas.pago === true && 'green') || (parcelas.pago === false && 'red') }}>
                          {(parcelas.pago === true && 'Pago') || (parcelas.pago === false && 'Devendo')}
                        </td>
                        <td>
                          <button>
                            <Link to={`/product/${parcelas.id}`}>
                              <BiEdit />
                            </Link>
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={(e) => handlerRemoveAccount(e, parcelas.id)}
                          >
                            <FcEmptyTrash />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
          ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPendingAccounts);
