import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  createFinancialBoxRequest,
  resetFormulario } from '~/store/modules/financialBox/actions';

import { Container } from './styles';

import Header from '~/components/HeaderListAndRegister';
import ListCaixa from './ListCaixa';

export default function Caixa() {
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
        <Form onSubmit={handleSubmit} >
          <div className="data">
            <label>Data Abertura Caixa</label>
            <Input name="open_caixa" type="date" />
          </div>
          <div className="valor-open">
            <label>Valor Abertura Caixa</label>
            <Input name="value_open" type="number"/>
          </div>
          <div className="but">
            <button type="submit">Abrir um novo caixa</button>
          </div>
        </Form>
      </Container>  
      <ListCaixa />
    </>
  );
}

