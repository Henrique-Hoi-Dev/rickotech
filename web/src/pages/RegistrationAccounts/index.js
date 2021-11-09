import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '~/components/HeaderListAndRegister';
import { FcHighPriority } from 'react-icons/fc';
import { Container } from './styles';

import {
  createAccountRequest,
  getByIdAccountRequest,
  UpdateAccountRequest,
  resetFormulario,
} from '~/store/modules/account/actions';

// const schema = Yup.object().shape({
//   name: Yup.string().required('Este compo é obrigatório.').max(100, 'No máximo 100 caracteres'),
//   data_vencimento: Yup.date().required('Este compo é obrigatório.'),
//   status: Yup.string().required('Este compo é obrigatório.'),
// });

export default function RegistrationAccounts() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { form } = useSelector((state) => state.account);

  useEffect(() => {
    if (id) {
      dispatch(getByIdAccountRequest(id));
    } else {
      dispatch(resetFormulario());
    }
  }, [id, dispatch]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      let body = JSON.parse(JSON.stringify(values));

      if (id) {
        dispatch(UpdateAccountRequest({ account_id: id , values: body}));
      } else {
        dispatch(createAccountRequest(values));

        handleReset(resetForm);
      }
    } catch (error) {
      toast.error('Error check data');
    }
  };

  const handleReset = (resetForm) => {
    resetForm({});
  };

  return (
    <Container>
      <Header title="Registro de contas"/>
      <div className="header-main">
        <Formik
          onSubmit={handleSubmit}
          // validationSchema={schema}
          enableReinitialize={true}
          initialValues={form}
        >
          {(formProps) => {
            return (
              <Form className="form-input">
                <div id="container-input" className="header-title">
                  <div className="campo2">

                    <label htmlFor="name">Conta</label>
                    <Field name="name" type="text" placeholder="Nome conta" />
                    <span>{formProps.errors.name}</span>

                    <label htmlFor="data_vencimento">Data vencimento</label>
                    <Field name="data_vencimento" type="date" placeholder="Data vencimento" />
                    <span>{formProps.errors.data_vencimento}</span>

                    <label htmlFor="status">Status</label>
                    <Field component="select" id="location" name="status">
                      <option value="pendente">Pendente</option>
                      <option value="cancelado">Cancelado</option>
                      <option value="pago">Pago</option>
                    </Field>
                    <span>{formProps.errors.status}</span>

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
            );
          }}
        </Formik>
      </div>
    </Container>
  );
}
