import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import {
  createProductRequest,
  getByIdProductRequest,
  UpdateProductRequest,
  resetFormularioProduct } from '~/store/modules/product/actions';

import CloseIcon from '@mui/icons-material/Close';
import AvatarInput from '../Avatarinput';
import Modal from '~/components/modal/modal';

import { FcHighPriority } from 'react-icons/fc';
import { Container } from './styles';
// import { formatMoney } from '~/util/mask';

const schema = Yup.object().shape({
  name: Yup.string().required('Este compo é obrigatório.')
  .max(100, 'No máximo 100 caracteres'),
  quantity: Yup.number().required('Este compo é obrigatório.'),
  price: Yup.number().required('Este compo é obrigatório.'),
});

export default function ModalRegistrationProduct({ showModal, setShowModal, ids }) {
  const dispatch = useDispatch();

  const { form } = useSelector((state) => state.product);

  useEffect(() => {
    if (ids) {
      dispatch(getByIdProductRequest(ids));
    }
  }, [ids, dispatch]);

  const handleSubmit = async (values) => {
    try {
      let body = JSON.parse(JSON.stringify(values));

      body.avatar_id = parseInt(
        document.getElementById('avatar').getAttribute('data-file')
      );

      if (form.id) {
        dispatch(UpdateProductRequest({ product_id: form.id, values: body }));
        setShowModal(false);
      } else {
        dispatch(createProductRequest({values: body}));
        onCloseProduct();
      }
    } catch (error) {
      toast.error('Error check data');
    }
  };

  const onCloseProduct = () => {
    setShowModal(false);
    dispatch(resetFormularioProduct())
  };

  return (
    <Modal 
      open={showModal}
      onClose={onCloseProduct}
      maxWidth={"900px!important"}
    >
       <Container>
        <div className="header-main">
          <Formik
            onSubmit={handleSubmit}
            validationSchema={schema}
            enableReinitialize={true}
            initialValues={form} >
            {(formProps) => { 
            return (
              <Form className="form-input" >
              <CloseIcon 
                sx={{ 
                  width: "1.5em", 
                  height: "1.5em", 
                  margin: "20px",
                  cursor: "pointer", 
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
                  borderRadius: "50%" 
                }} 
                onClick={onCloseProduct}
              />
              <div id="container-input" className="header-title">
                <div className="campo2">
                  <label htmlFor="Nome Produto">Nome</label>
                  <Field name="name" />
                  <span>{formProps.errors.name}</span>
                  <label htmlFor="category">Tipo de categoria</label>
                  <Field  component="select" name="category" >
                    <option value="0">Selecione</option>
                    <option value="iphone">iPhone</option>
                    <option value="samsung">Samsung</option>
                    <option value="perfume">Perfume</option>
                    <option value="apple-airpods">Apple AirPods</option>
                    <option value="carregador" >Carregador</option>
                    <option value="apple-watch" >Apple Watch</option>
                    <option value="smartwatch" >Smartwatch</option>
                  </Field>  
                </div>

                <div className="campo3">
                  <label htmlFor="price">Valor</label>
                  <Field name="price" type="number" />
                  <span>{formProps.errors.price}</span>
                  <ul>
                    <AvatarInput name="avatar_id" id={ids} />
                  </ul>
                </div>

                <div className="campo4">
                  <label htmlFor="quantity">Quantidade</label>
                  <Field name="quantity" />  
                  <label htmlFor="description">Tipo de descrição</label>                
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
    </Modal>
  );
}
