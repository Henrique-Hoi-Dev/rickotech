import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '~/components/HeaderListAndRegister';
import { FcHighPriority } from 'react-icons/fc';
import { Container } from './styles';

import {
  createServicetRequest,
  getByIdServiceRequest,
  resetFormulario } from '~/store/modules/servicos/actions';

export default function RegistreServices() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { form } = useSelector((state) => state.account);
  
  useEffect(() => {
    if (id) {
      dispatch(getByIdServiceRequest(id));
    } else {
      dispatch(resetFormulario());
    }
  }, [id, dispatch]);

  const handleSubmit = async (values) => {
    try {
      // let body = JSON.parse(JSON.stringify(values));

      if (id) {
        // dispatch(UpdateAccountRequest({ account_id: id , values: body}));
      } else {
        dispatch(createServicetRequest(values));
      }
    } catch (error) {
      toast.error('Error check data');
    }
  };

  return (
    <Container>
      <Header title="Registro de Serviços"/>
      <div className="header-main">
        <Formik
          onSubmit={handleSubmit}
          enableReinitialize={true}
          initialValues={form}
          >
            <Form className="form-input">
              <div id="container-input" className="header-title">
                <div className="campo2">
                  <label htmlFor="name">Nome do Serviço</label>
                  <Field 
                    name="name" 
                    placeholder="nome" />

                  <label htmlFor="valor">Valor</label>
                  <Field 
                    name="valor" 
                    placeholder="valor" />

                  <label htmlFor="data_serviço">Dia do serviço feito</label>
                  <Field 
                    name="data_serviço" 
                    type="date" 
                    placeholder="data do serviço" />
                </div>              
                <footer className="buttons-container">
                    <p>
                      <FcHighPriority />
                      Serviço só será registrado, só com o caixa aberto!<br/>
                      Preencha todos os dados!
                    </p>
                  <button type="submit">Salvar</button>
                  {/* <button>
                    <Link to={`/registrePortion`}>
                      Criar parcelas
                    </Link>
                  </button> */}
                </footer>
              </div>
            </Form>
        </Formik>
      </div>
    </Container>
  );
}
