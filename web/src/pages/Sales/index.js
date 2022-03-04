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
              <label htmlFor="name">Nome do Produto</label>
              <Field name="name" component="select"  placeholder="nome" >
                <option value="0" >selecione o nome</option>
                <option value={productList.name} >{productList.name}</option>
              </Field>
              <label htmlFor="valor">Valor do Produto</label>
              <Field name="price" component="select" placeholder="valor" >
                <option value="0" >selecione o valor</option>
                <option value={productList.valor}>
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
              <label htmlFor="desconto">% Desconto</label>
              <Field name="desconto" type="number" /> 
            </div>

            <div className="tipo-venda-1">
              <label htmlFor="tipo_pagamento">Tipo de Venda</label>
              <Field name="tipo_pagamento" component="select" >
                <option value="0" >selecione um caixa</option>
                <option value="AVISTA" >Avista</option>
                <option value="PARCELADO">Parcelado</option>
              </Field>
            </div>
            <div className="tipo-venda-2">
              <label htmlFor="tipo_pagamento">Status de Venda</label>
              <Field name="status" component="select" >
                <option value="0" >selecione uma opção</option>
                <option value={true} >Compra em Aberto</option>
                <option value={false}>Finalizado</option>
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
