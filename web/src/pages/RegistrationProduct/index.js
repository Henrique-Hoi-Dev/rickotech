import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProductRequest,
  getByIdProductRequest,
  UpdateProductRequest,
  resetFormulario,
} from '~/store/modules/product/actions';

import Header from '~/components/HeaderListAndRegister';
import AvatarInput from './Avatarinput';
import { FcHighPriority } from 'react-icons/fc';
import { Container } from './styles';


export default function RegistrationProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { productList } = useSelector((state) => state.product);

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
      <Header title="Registro de produtos"/>
      <div className="header-main">
        <Formik
          onSubmit={handleSubmit}
          enableReinitialize={true}
          initialValues={productList} 
          >           
          <Form className="form-input">
            <div id="container-input" className="header-title">
              <div className="campo2">
                <Field name="name" type="text" placeholder="Nome Produto" />
                <Field name="altura" type="text" placeholder="Altura" />
                <Field name="largura" type="text" placeholder="Largura" />
                <Field
                  name="comprimento"
                  type="text"
                  placeholder="Comprimento"
                />
              </div>

              <div className="campo3">
                <Field name="peso" type="text" placeholder="Peso(kg)" />
                <Field
                  name="valor"
                  type="number"
                  placeholder="Preço($)"
                  // onkeyup="currencyFormat"
                />
                <ul>
                  <AvatarInput name="avatar_id" />
                </ul>
                </div>

                <div className="campo4">
                  <Field 
                    type="text" 
                    placeholder="Categoria" 
                    name="categoria" />
                  <Field
                    placeholder="Data do registro"
                    type="date"
                    name="data_registro" />
                    <Field  component="select" name="status" >
                      <option value="EM-ESTOQUE">Em estoque</option>
                      <option value="VENDIDO">Vendido</option>
                    </Field>                    
                    <Field
                      name="codigo_barra"
                      type="text"
                      placeholder="Código de barras"
                    />
                  </div>

                  <div className="campo5">
                    <Field 
                      as="textarea" 
                      name="descricao" 
                      type="text" />
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
