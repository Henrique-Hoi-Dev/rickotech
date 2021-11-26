import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '~/components/HeaderListAndRegister';
import { FcHighPriority } from 'react-icons/fc';
import { Container } from './styles';

import {
  createPortionRequest,
  getByIdPortionRequest,
  resetFormulario,
  UpdatePortionRequest } from '~/store/modules/portion/actions';

export default function RegistrationPortion(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const  { form }  = useSelector((state) => state.portion);
  
  useEffect(() => {
    if (props.match.path === '/portion/:id') {
      dispatch(getByIdPortionRequest(id));
    } else {
      dispatch(resetFormulario());
    }
  }, [props.match.path, id, dispatch]);

  const handleSubmit = async (values) => {
    try {
      let body = JSON.parse(JSON.stringify(values));

      if (form.numero_parcela) {
        dispatch(UpdatePortionRequest({ id: id , values: body}));
      } else {
        dispatch(createPortionRequest(values, id));
      }
    } catch (error) {
      toast.error('Error check data');
    }
  };

  return (
    <Container>
      <Header title="Registre todas as parcelas"/>
      <div className="header-main">
        <Formik
          onSubmit={handleSubmit}
          enableReinitialize={true}
          initialValues={form} >
            <Form className="form-input">
              <div id="container-input" className="header-title">
                <div className="campo2">
                  <label htmlFor="valor">Valor</label>
                  <Field 
                    name="valor" 
                    placeholder="valor" />
                  <label htmlFor="numero_parcela">Número Parcela</label>
                  <Field 
                    name="numero_parcela" 
                    placeholder="nome conta" />
                  <label htmlFor="data_vencimento">Data vencimento</label>
                  <Field 
                    name="data_vencimento" 
                    type="date" 
                    placeholder="data vencimento" /> 
                  <label htmlFor="pago">Status</label>
                  <Field component="select" id="location" name="pago">
                    <option value="false">Devendo</option>
                    <option value="true">Pago</option>
                  </Field>
                </div>              
                <footer className="buttons-container">
                    <p>
                      <FcHighPriority />
                      Importante! <br />
                      Preencha todos os dados
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
