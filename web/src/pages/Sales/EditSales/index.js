import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { UpdateSalesRequest } from '~/store/modules/sales/actions';
import { getByIdSalesRequest } from '~/store/modules/sales/actions';

import { Container } from './styles';

import Header from '~/components/Header';

export default function EditSales() {
const dispatch = useDispatch();
const { id } = useParams();
const { form } = useSelector((state) => state.sales);

useEffect(() => {
  dispatch(getByIdSalesRequest(id));
}, [id, dispatch]);
  
const handleSubmit = async (values, { resetForm }) => {
  let body = JSON.parse(JSON.stringify(values));

  dispatch(UpdateSalesRequest({ id: id, values: body }));
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
              <label htmlFor="status">Status de Venda</label>
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
                <Link to="/dashboard">
                  <button className="cancela">
                    Cancelar venda
                  </button>
                </Link>
            </div>
          </Form>
        </Formik> 
      </Container> 
    </>
  );
}
