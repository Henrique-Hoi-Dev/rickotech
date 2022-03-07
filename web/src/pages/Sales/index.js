import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FcHighPriority } from 'react-icons/fc';
import * as moment from 'moment';

import {
  createSalesRequest,
  UpdateSalesRequest,
  resetFormulario } from '~/store/modules/sales/actions';
import { getByIdProductRequest } from '~/store/modules/product/actions';
import { findAllFinancialBoxRequest } from '~/store/modules/financialBox/actions';

import { Container } from './styles';
import Header from '~/components/HeaderListAndRegister';

const RegistreSales = ({ financialBoxList }) => {
const dispatch = useDispatch();
const { id } = useParams();
const { form } = useSelector((state) => state.sales);
const productList = useSelector((state) => state.product.form);

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
    let body = JSON.parse(JSON.stringify(values));

    if (productList.sales === [0]) {
      dispatch(UpdateSalesRequest({ id: id, values: body }));
    } else {
      dispatch(createSalesRequest(values, id));

      handleReset(resetForm);
    }
  } catch (error) {
    toast.error('Error nos dados');
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
              <Field name="name_product" component="select"  placeholder="nome" >
                <option value="0" >selecione o nome</option>
                <option value={productList.name} >{productList.name}</option>
              </Field>
              <label htmlFor="price_product">Valor do Produto</label>
              <Field name="price_product" component="select" placeholder="valor" >
                <option value="0" >selecione o valor</option>
                <option value={productList.price}>
                  {productList.price}
                </option>
              </Field>
            </div>
            
            <div className="tipo-venda">
              <label htmlFor="financial_id">Caixa</label>
              <Field  component="select" name="financial_id" >
                    <option value="0">Selecione um caixa</option>
                    {financialBoxList.map((caixa, i) => (
                      <option key={i} value={caixa.id} >
                      {moment(caixa.open_caixa).format('DD/MM/YYYY')} - {(caixa.status === false && 'Aberto')
                      || (caixa.status === true && 'Fechado')}
                      </option>
                    ))}    
                  </Field>
              <label htmlFor="discount">% Desconto</label>
              <Field name="discount" type="number" /> 
            </div>

            <div className="tipo-venda-1">
          <label htmlFor="tipo_pagamento">Quantidade</label>
              <Field name="quantity" type="number" />
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    financialBoxList: state.financialBox.financialBoxList ? state.financialBox.financialBoxList : [],
  };
};

export default connect(mapStateToProps) (RegistreSales)
