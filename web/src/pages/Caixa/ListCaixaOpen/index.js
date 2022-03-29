import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FcInfo } from 'react-icons/fc';
import * as moment from 'moment';

import { findAllOpenRequest } from '~/store/modules/financialBox/actions';
import { connect } from 'react-redux';

import { Container } from './styles';

const ListCaixa = ({ financialBoxList }) => {
const dispatch = useDispatch();
const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(findAllOpenRequest(id));
    } 
  }, [id, dispatch]);

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
      <h2>Caixa em aberto</h2>
      <table className="table-list">
          <thead>
            <tr className="table-title">
              <td>Funcionario</td>
              <td>Data abertura</td>
              <td>Data fechamento</td>
              <td>Valor abertuta</td>
              <td>Valor vendas</td>
              <td>Valor serviços</td>
              <td>Valor total</td>
              <td>Status</td>
              <td>Info</td>
            </tr>
          </thead>
          <tbody>
            {[].concat(financialBoxList).map((financial, i) => (
              <tr key={i} value={financial.id} >
                <td>{financial.user.name}</td>
                <td>{moment(financial.open_caixa).format('DD/MM/YYYY')}</td>
                <td>
                  {(financial.close_caixa === null) ? 'Em espera...' :
                  moment(financial.close_caixa).format('DD/MM/YYYY')}
                </td>
                <td>{currencyFormat(financial.value_open || [0])}</td>
                <td>{currencyFormat(financial.value_total_sales || [0])}</td>
                <td>{currencyFormat(financial.value_total_service || [0])}</td>
                <td>{currencyFormat(financial.value_total || [0])}</td>
                <td 
                  style={{ color: (financial.status === true && 'red') || 
                  (financial.status === false && 'green') }} 
                >
                  {(financial.status === true && 'Fechado') || 
                  (financial.status === false && 'Em aberto')}
                </td>
                <td>
                  <Link to={`/caixaInfo/${financial.id}`}>
                    <FcInfo/>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>  
  );
}

const mapStateToProps = (state) => {
  return {
    financialBoxList: state.financialBox.financialBoxListOpen ? state.financialBox.financialBoxListOpen : [],
  };
};

export default connect(mapStateToProps) (ListCaixa);
