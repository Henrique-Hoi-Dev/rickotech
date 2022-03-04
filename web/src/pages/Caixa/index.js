import React, { useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FcInfo } from 'react-icons/fc';
import * as moment from 'moment';

import {
  createFinancialBoxRequest,
  findAllFinancialBoxRequest,
  resetFormulario } from '~/store/modules/financialBox/actions';

import { Container, List } from './styles';
import Header from '~/components/HeaderListAndRegister';
import { connect } from 'react-redux';

const Caixa = ({ financialBoxList }) => {
const dispatch = useDispatch();
const { form } = useSelector((state) => state.financialBox);
const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(findAllFinancialBoxRequest());
      dispatch(resetFormulario());
    } 
  }, [id, dispatch]);
  
  const handleSubmit = async (values, { resetForm }) => {
    dispatch(createFinancialBoxRequest(id, values));
    dispatch(findAllFinancialBoxRequest());
    dispatch(resetFormulario());
    handleReset(resetForm);
  };

  const handleReset = (resetForm) => {
    resetForm();
  };

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
    <>
    <Header title="Caixa"/>
      <Container>  
        <Form onSubmit={handleSubmit} initialData={form} >
          <div className="data">
            <label>Data Abertura Caixa</label>
            <Input name="open_caixa" type="date" />
          </div>
          <div className="value-open">
            <label>Valor Abertura Caixa</label>
            <Input name="value_open" type="number" placeholder="valor"/>
          </div>
          <div className="but">
            <button type="submit">Abrir um novo caixa</button>
          </div>
        </Form>
      </Container> 
      <List>
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
                <tr key={i} value={financial.id}>
                  <td>{financial.user.name}</td>
                  <td>{moment(financial.open_caixa).format('DD/MM/YYYY')}</td>
                  <td>{moment(financial.close_caixa).format('DD/MM/YYYY')}</td>
                  <td>{currencyFormat(financial.value_open || [0])}</td>
                  <td>{currencyFormat(financial.value_total_sales || [0])}</td>
                  <td>{currencyFormat(financial.value_total_service || [0])}</td>
                  <td>{currencyFormat(financial.value_total || [0])}</td>
                  <td style={{ color: 
                      (financial.status === true && 'red') || 
                      (financial.status === false && 'green') }} >
                      {(financial.status === true && 'Fechado') || 
                       (financial.status === false && 'Aberto')}</td>
                  <td>
                    <Link to={`/caixaInfo/${financial.id}`}>
                      <FcInfo/>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </List>     
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    financialBoxList: state.financialBox.financialBoxList ? state.financialBox.financialBoxList : [],
  };
};

export default connect(mapStateToProps) (Caixa);
