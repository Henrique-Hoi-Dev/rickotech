import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProductRequest,
  getByIdProductRequest,
  UpdateProductRequest,
  resetFormulario } from '~/store/modules/product/actions';

import Header from '~/components/HeaderListAndRegister';
import AvatarInput from './Avatarinput';

import { FcHighPriority } from 'react-icons/fc';
import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Este compo é obrigatório.')
  .max(100, 'No máximo 100 caracteres'),
  quantity: Yup.number().required('Este compo é obrigatório.'),
  price: Yup.number().required('Este compo é obrigatório.'),
});

export default function RegistrationProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { form } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(getByIdProductRequest(id));
    } else {
      dispatch(resetFormulario());
    }
  }, [id, dispatch]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      let body = JSON.parse(JSON.stringify(values));

      body.avatar_id = parseInt(
        document.getElementById('avatar').getAttribute('data-file')
      );

      if (id) {
        dispatch(UpdateProductRequest({ product_id: id, values: body }));
      } else {
        dispatch(createProductRequest(values));
        handleReset(resetForm);
      }
    } catch (error) {
      toast.error('Error check data');
    }
  };

  const handleReset = (resetForm) => {
    resetForm({});
    document.getElementById('avatar').setAttribute('data-file', null);
    document
      .getElementById('avatar-img')
      .setAttribute(
        'src',
        'https://faculty.iiit.ac.in/~indranil.chakrabarty/images/empty.png'
      );
  };

  return (
    <Container>
      <Header title="Registro de produtos"/>
      <div className="header-main">
        <Formik
          onSubmit={handleSubmit}
          validationSchema={schema}
          enableReinitialize={true}
          initialValues={form} >
          {(formProps) => { 
          return (
            <Form className="form-input" >
            <div id="container-input" className="header-title">
              <div className="campo2">
                <label htmlFor="Nome Produto">Nome</label>
                <Field name="name" />
                <span>{formProps.errors.name}</span>
                <label htmlFor="categoty">Tipo de categoria</label>
                <Field  component="select" name="categoty" >
                  <option value="0">Selecione</option>
                  <option value="iphone" >iPhone</option>
                  <option value="samsung" >Samsung</option>
                  <option value="perfume" >Perfume</option>
                  <option value="apple-airpods" >Apple AirPods</option>
                  <option value="carregador" >Carregador</option>
                  <option value="apple-watch" >Apple Watch</option>
                  <option value="smartwatch" >Smartwatch</option>
                </Field>  
              </div>

              <div className="campo3">
                <label htmlFor="valor">Valor</label>
                <Field name="price" type="number" />
                <span>{formProps.errors.price}</span>
                <ul>
                  <AvatarInput name="avatar_id" />
                </ul>
              </div>

              <div className="campo4">
                <label htmlFor="quantidade">Quantidade</label>
                <Field name="quantity" />  
                <label htmlFor="decricao">Tipo de descrição</label>                
                <Field  component="select" name="description" >
                  <option value="0">Selecione</option>
                  <option value="novo" >Novo</option>
                  <option value="seminovo" >Seminovo</option>
                  <option value="usado" >Usado</option>
                </Field> 
                <span>{formProps.errors.description}</span>
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
          )}}            
        </Formik>
      </div>
    </Container>
  );
}
