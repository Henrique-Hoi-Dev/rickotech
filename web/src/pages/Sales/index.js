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

const RegistreSales = ({ financialBoxList }) => {
const dispatch = useDispatch();
const { id } = useParams();
const { form } = useSelector((state) => state.sales);
const { card } = useSelector((state) => state.financialBox);

const productId = useSelector((state) => state.product.form);

const [setPreview] = useState(card);

useEffect(() => {
  if (id) {
    dispatch(getByIdProductRequest(id));
    dispatch(findAllFinancialBoxRequest());
    dispatch(resetFormulario());
  }
}, [id, dispatch]);
  
const handleSubmit = async (values, { resetForm }) => {
  dispatch(createSalesRequest(values, id));
  dispatch(resetFormulario());
  setPreview(card)
  handleReset(resetForm);
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
                <option value={productId.name || ''} >{productId.name || ''}</option>
              </Field>
              <label htmlFor="price_product">Valor do Produto</label>
              <Field name="price_product" component="select" >
                <option value="0" >selecione o valor</option>
                <option value={productId.price || ''}>{productId.price || ''}</option>
              </Field>
            </div>
            
            <div className="tipo-venda">
              <label htmlFor="financial_id">Caixa</label>
              <Field component="select" name="financial_id" >
                <option value="0">Selecione um caixa</option>
                {[].concat(financialBoxList[0]).map((caixa, i) => (
                <option key={i} value={caixa.id || ''} >
                {moment(caixa.open_caixa).format('DD/MM/YYYY')} /
                {(caixa.status === false && 'Aberto')}
                </option>
                ))}    
              </Field>
              <label htmlFor="discount">% Desconto</label>
              <Field name="discount" type="number" />  
            </div>

            <div className="tipo-venda-1">
              <label htmlFor="product_quantity">Quantidade</label>
              <Field name="product_quantity" type="number" />
            </div>
            <div className="tipo-venda-2">
              <label htmlFor="status">Status de Venda</label>
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
    financialBoxList: state.financialBox.financialBoxList.responseData ? state.financialBox.financialBoxList.responseData : [],
  };
};

export default connect(mapStateToProps) (RegistreSales)
