import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FcHighPriority } from 'react-icons/fc';
import * as moment from 'moment';

import {
  createSalesRequest,
  resetFormulario } from '~/store/modules/sales/actions';
import { getByIdProductRequest } from '~/store/modules/product/actions';
import { findAllFinancialBoxRequest } from '~/store/modules/financialBox/actions';

import { Container } from './styles';

import Header from '~/components/HeaderListAndRegister';
import Footer from '~/components/Footer';

const RegistreSales = ({ financialBoxList }) => {
const dispatch = useDispatch();
const { id } = useParams();
const { form } = useSelector((state) => state.sales);
const productList = useSelector((state) => state.product.form);

const { card } = useSelector((state) => state.financialBox);
const [setPreview] = useState(card);

useEffect(() => {
  if (id) {
    dispatch(getByIdProductRequest(id));
    dispatch(findAllFinancialBoxRequest());
  } else {
    dispatch(resetFormulario());
  }
}, [id, dispatch]);
  
const handleSubmit = async (values, { resetForm }) => {
  try {
    dispatch(createSalesRequest(values, id));
    dispatch(resetFormulario());
    setPreview(card)
    handleReset(resetForm);

  } catch (error) {
    // toast.error('Error nos dados');
  }
};

const handleReset = (resetForm) => {
  resetForm({});
};

  return (
    <>
    <Header title="Venda"/>
      <Container>
        <Formik
          onSubmit={handleSubmit}
          enableReinitialize={true}
          initialValues={form} > 
          <Form >
            <div className="statos">
              <label htmlFor="name_product">Nome do Produto</label>
              <Field name="name_product" component="select" >
                <option value="0" >selecione o nome</option>
                <option value={productList.name} >{productList.name}</option>
              </Field>
              <label htmlFor="price_product">Valor do Produto</label>
              <Field name="price_product" component="select" >
                <option value="0" >selecione o valor</option>
                <option value={productList.price}>{productList.price}</option>
              </Field>
            </div>
            
            <div className="tipo-venda">
              <label htmlFor="financial_id">Caixa</label>
              <Field component="select" name="financial_id" >
                <option value="0">Selecione um caixa</option>
                {financialBoxList.map((caixa, i) => (
                <option key={i} value={caixa.id} >
                {moment(caixa.open_caixa).format('DD/MM/YYYY')} - {(caixa.status === false && 'Aberto')
                || (caixa.status === true && 'Fechado')}
                </option>
                ))}    
              </Field>
              <label htmlFor="discount">% Desconto</label>
              <Field name="discount"  />  
            </div>

            <div className="tipo-venda-1">
              <label htmlFor="product_quantity">Quantidade</label>
              <Field name="product_quantity" />
            </div>
            <div className="tipo-venda-2">
              <label htmlFor="tipo_pagamento">Status de Venda</label>
              <Field name="status" component="select" >
                <option value="0" >selecione uma opção</option>
                <option value="open" >Em Aberto</option>
                <option value="closed">Fechado</option>
                <option value="sold">Vendido</option>
              </Field>
            </div>

            <div className="but">
              <button type="submit">Confirmar venda</button>
                <Link to="/listProducts">
                  <button className="cancela">
                    Cancelar venda
                  </button>
                </Link>
            </div>
            <p>
              <FcHighPriority />
                Importante!<br/>
                Preencha todos os dados!
            </p>
          </Form>
        </Formik> 
      </Container> 
      <Footer/>               
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    financialBoxList: state.financialBox.financialBoxList.responseData ? state.financialBox.financialBoxList.responseData : [],
  };
};

export default connect(mapStateToProps) (RegistreSales)
