import React, { useEffect } from 'react';
import * as Yup from 'yup';
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

const schema = Yup.object().shape({
  name: Yup.string().required('Este compo é obrigatório.').max(100, 'No máximo 100 caracteres'),
  categoria: Yup.string().required('Este compo é obrigatório.'),
  altura: Yup.string().required('Este compo é obrigatório.'),
  largura: Yup.string().required('Este compo é obrigatório.'),
  comprimento: Yup.string().required('Este compo é obrigatório.'),
  codigo_barra: Yup.string().required('Este compo é obrigatório.'),
  peso: Yup.string().required('Este compo é obrigatório.'),
  valor: Yup.number().required('Este compo é obrigatório.'),
  descricao: Yup.string().required('Este compo é obrigatório.'),
  status: Yup.string().required('Este compo é obrigatório.'),
  data_registro: Yup.date().required('Data é obrigatório.'),
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
          validationSchema={schema}
          enableReinitialize={true}
          initialValues={form}
        >
          {(formProps) => {
            return (
              <Form className="form-input">
                <div id="container-input" className="header-title">
                  <div className="name-campo"></div>

                  <div className="campo2">
                    <label htmlFor="name">Nome do Produto</label>
                    <Field name="name" type="text" placeholder="Nome Produto" />
                    <span>{formProps.errors.name}</span>
                    <label htmlFor="altura">Altura(cm)</label>
                    <Field name="altura" type="text" placeholder="Altura" />
                    <span>{formProps.errors.altura}</span>
                    <label htmlFor="largura">Largura(cm)</label>
                    <Field name="largura" type="text" placeholder="Largura" />
                    <span>{formProps.errors.largura}</span>
                    <label htmlFor="comprimento">Comprimento(cm)</label>
                    <Field
                      name="comprimento"
                      type="text"
                      placeholder="Comprimento"
                    />
                    <span>{formProps.errors.comprimento}</span>
                  </div>

                  <div className="campo3">
                    <label htmlFor="peso">Peso do produto(kg)</label>
                    <Field name="peso" type="text" placeholder="Peso(kg)" />
                    <span>{formProps.errors.peso}</span>

                    <label htmlFor="valor">Preço($)</label>
                    <Field
                      name="valor"
                      type="number"
                      placeholder="Preço($)"
                      onkeyup={currencyFormat}
                    />

                    <span>{formProps.errors.valor}</span>
                    <ul>
                      <AvatarInput name="avatar_id" />
                    </ul>
                  </div>

                  <div className="campo4">
                    <label htmlFor="categoria">Categoria</label>
                    <Field 
                      type="text" 
                      placeholder="Categoria" 
                      name="categoria"
                    />
                    <span>{formProps.errors.categoria}</span>

                    <label htmlFor="data_registro">Data do registro</label>
                    <Field
                      placeholder="Data do registro"
                      type="date"
                      name="data_registro"
                    />
                    <span>{formProps.errors.data_registro}</span>

                    <label htmlFor="status">Satus compra</label>
                    <Field  component="select" name="status" >
                      <option value="EM-ESTOQUE">Em estoque</option>
                      <option value="VENDIDO">Vendido</option>
                    </Field>                    

                    <label htmlFor="codigo_barra">Código de barra</label>
                    <Field
                      name="codigo_barra"
                      type="text"
                      placeholder="Código de barras"
                    />
                    <span>{formProps.errors.codigo_barra}</span>
                  </div>

                  <div className="campo5">
                    <label htmlFor="descricao">Descrição</label>
                    <Field as="textarea" name="descricao" type="text" />
                    <span>{formProps.errors.descricao}</span>
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
