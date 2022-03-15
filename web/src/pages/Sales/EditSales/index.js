import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import {
  UpdateSalesRequest,
  resetFormulario } from '~/store/modules/sales/actions';
import { getByIdSalesRequest } from '~/store/modules/sales/actions';

import { Container } from './styles';

import Header from '~/components/HeaderListAndRegister';
import Footer from '~/components/Footer';

export default function EditSales() {
const dispatch = useDispatch();
const { id } = useParams();
const { responseData } = useSelector((state) => state.sales.form);

const { card } = useSelector((state) => state.financialBox);
const [setPreview] = useState(card);

useEffect(() => {
  if (id) {
    dispatch(getByIdSalesRequest(id));
  } else {
    dispatch(resetFormulario());
  }
}, [id, dispatch]);
  
const handleSubmit = async (values, { resetForm }) => {
  try {
    let body = JSON.parse(JSON.stringify(values));

    dispatch(UpdateSalesRequest({ id: id, values: body }));
    dispatch(resetFormulario(id));
    setPreview(card)
    handleReset(resetForm);

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
          initialValues={responseData} > 
          <Form >
            <div className="statos">        
              <label htmlFor="tipo_pagamento">Status de Venda</label>
              <Field name="status" component="select" >
                <option value="0" >selecione uma opção</option>
                <option value="open" >Em Aberto</option>
                <option value="closed">Fechado</option>
                <option value="sold">Vendido</option>
              </Field>
            </div>
            
            <div className="tipo-venda">
              <label htmlFor="discount">% Desconto</label>
              <Field name="discount" type="number" /> 
            </div>

            <div className="tipo-venda-1">
              <label htmlFor="product_quantity">Quantidade</label>
              <Field name="product_quantity" type="number" />
            </div>
            <div className="tipo-venda-2">
              <Field name="product_id" />
            </div>

            <div className="but">
              <button type="submit">Confirmar venda</button>
                <Link to="/listProducts">
                  <button className="cancela">
                    Cancelar venda
                  </button>
                </Link>
            </div>
          </Form>
        </Formik> 
      </Container> 
      <Footer/>               
    </>
  );
}
