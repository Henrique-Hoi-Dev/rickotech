import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  createFinancialBoxRequest,
  resetFormulario } from '~/store/modules/financialBox/actions';

import { Container } from './styles';

import Header from '~/components/HeaderListAndRegister';
import ListCaixa from './ListCaixa';

const Caixa = ({ financialBoxList }) => {
const dispatch = useDispatch();
const { id } = useParams();
  
  const handleSubmit = async (values, { resetForm }) => {
    dispatch(createFinancialBoxRequest(id, values));
    dispatch(resetFormulario());
    handleReset(resetForm);
  };

  const handleReset = (resetForm) => {
    resetForm();
  };

  return (
    <>
    <Header title="Caixa"/>
      <Container>  
        <h2>Abertuta de caixa</h2>

        <Form onSubmit={handleSubmit} >
          <div className="data">
            <label>Data</label>
            <Input name="open_caixa" type="date" />
          </div>
          <div className="valor-open">
            <label>Valor</label>
            <Input name="value_open" type="number"/>
          </div>
          <div 
            className="but" 
            style={{ display: (financialBoxList[0].status === false && 'none') ||
                    (financialBoxList[0].status === true && 'line-through') }}>
            <button type="submit">
              Abrir um novo caixa
            </button>
          </div>
        </Form>
        <span 
        style={{ display: (financialBoxList[0].status === true && 'none') ||
          (financialBoxList[0].status === false && 'line-through') }}
        >Já há um caixa em aberto</span>
      </Container>  
      <ListCaixa />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    financialBoxList: state.financialBox.financialBoxList ? state.financialBox.financialBoxList : [],
  };
};

export default connect(mapStateToProps) (Caixa);

