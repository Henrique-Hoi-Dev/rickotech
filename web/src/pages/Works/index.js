import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';

import { connect, useDispatch, useSelector } from 'react-redux';

import Header from '~/components/HeaderListAndRegister';
import * as moment from 'moment';

import { FcHighPriority } from 'react-icons/fc';
import { Container } from './styles';

import {
  createServicetRequest,
  resetFormulario } from '~/store/modules/servicos/actions';
import { findAllOpenRequest } from '~/store/modules/financialBox/actions';
  
const RegistreServices = ({ financialBoxListOpen }) => {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.servicos);
  const { id } = useSelector((state) => state.user.profile);

  useEffect(() => {
    dispatch(findAllOpenRequest(id));
    dispatch(resetFormulario());
  }, [id, dispatch]);

  const handleSubmit = async (values, { resetForm }) => {
      dispatch(createServicetRequest(values, id));

      handleReset(resetForm);
  };
  
  const handleReset = (resetForm) => {
    resetForm({});
  };

  return (
    <Container>
      <Header title="Registro de Serviços"/>
      <div className="header-main">
        <Formik
          onSubmit={handleSubmit}
          enableReinitialize={true}
          initialValues={form} >
            <Form className="form-input">
              <div id="container-input" className="header-title">
                <div className="campo2">
                  <label htmlFor="name">Nome do Serviço</label>
                  <Field  name="name" />

                  <label htmlFor="valor">Valor</label>
                  <Field type="number" name="price" />
                </div>

                <div className="campo" >
                  <label htmlFor="id">Caixa</label>
                  <Field  component="select" name="financial_id" >
                    <option value="0">Selecione um caixa</option>
                    {[].concat(financialBoxListOpen).map((caixa, i) => (
                      <option key={i} value={caixa.id} >
                      {moment(caixa.open_caixa).format('DD/MM/YYYY') === false}  
                      {(caixa.status === false && 'Aberto')}
                      </option>
                    ))}    
                  </Field>   
                  <label htmlFor="data_serviço">Dia do serviço feito</label>
                  <Field name="date_service" type="date" />
                </div> 

                <footer className="buttons-container">
                    <p>
                      <FcHighPriority />
                      Preencha todos os dados!
                    </p>
                  <button type="submit">Salvar</button>
                </footer>
              </div>
            </Form>
        </Formik>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    financialBoxListOpen: state.financialBox.financialBoxListOpen ? state.financialBox.financialBoxListOpen : [],
  };
};

export default connect(mapStateToProps) (RegistreServices)