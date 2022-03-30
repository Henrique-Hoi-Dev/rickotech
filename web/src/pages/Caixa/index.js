import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import { toast } from 'react-toastify';

import {
  createFinancialBoxRequest,
  findAllOpenRequest,
  resetFormulario } from '~/store/modules/financialBox/actions';

import { Container } from './styles';

import Header from '~/components/HeaderListAndRegister';
import ListCaixa from './ListCaixa';
import ListCaixaOpen from './ListCaixaOpen';

const Caixa = ({ financialBoxList }) => {
const dispatch = useDispatch();
const { id } = useParams();

useEffect(() => {
  if (id) {
    dispatch(findAllOpenRequest(id));
  } 
}, [id, dispatch]);
  
const handleSubmit = async (values) => {
  try {
    dispatch(createFinancialBoxRequest( id, values ));
    dispatch(resetFormulario());
  } catch {
    toast.error('Error check data');
  }
};

  return (
    <>
      <Header title="Caixa"/>
        <Container  >
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
                  style={{ display: (financialBoxList.length <= 0 && 'line-through') ||
                           (financialBoxList[0].status === false && 'none' ) ||
                           (financialBoxList[0].status === true && 'line-through' )
                          }}>
                  <button type="submit">
                    Abrir um novo caixa
                  </button>
                </div>
                <div className="erro">
                  <span style={{ display: (financialBoxList.length <= 0 && 'none') ||
                                (financialBoxList[0].status === false && 'line-through' ) ||
                                (financialBoxList[0].status === true && 'none' )
                                }}>
                    Já há um caixa em aberto
                  </span>
                </div>
            </Form>
        </Container>
      <ListCaixaOpen />
      <ListCaixa />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    financialBoxList: state.financialBox.financialBoxListOpen ? state.financialBox.financialBoxListOpen : [],
  };
};

export default connect(mapStateToProps) (Caixa);

