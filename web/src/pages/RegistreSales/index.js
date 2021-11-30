import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FcHighPriority } from 'react-icons/fc';

import {
  createSalesRequest,
  // getByIdVendaRequest,
  UpdateSalesRequest,
  resetFormulario,
} from '~/store/modules/sales/actions';
import { getByIdProductRequest } from '~/store/modules/product/actions';

import { Container } from './styles';
import Header from '~/components/HeaderListAndRegister';

export default function Sales() {
const dispatch = useDispatch();
const { id } = useParams();
const { form } = useSelector((state) => state.sales);
const productList = useSelector((state) => state.product.form);
const { financialBoxList } = useSelector((state) => state.financialBox);

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
              <Field name="valor" component="select" placeholder="valor" >
                <option value="0" >selecione o valor</option>
                <option value={productList.valor} >{productList.valor}</option>
              </Field>
            </div>
            
            {financialBoxList.map((caixa, i) => (
            <div className="tipo-venda" key={i}>
              <label htmlFor="financial_id">Caixa</label>
              <Field name="financial_id" component="select" placeholder="caixa">
                <option value="0" >selecione um caixa</option>
                <option value={caixa.id} >{caixa.open_caixa}</option>
              </Field>
              <label htmlFor="desconto">% Desconto</label>
              <Field name="desconto" type="number" placeholder="%"/> 
            </div>
            ))} 

            <div className="tipo-venda-1">
              <label htmlFor="tipo_pagamento">Tipo de Venda</label>
              <Field name="tipo_pagamento" component="select" placeholder="venda">
                <option value="0" >selecione um caixa</option>
                <option value="AVISTA" >Avista</option>
                <option value="PARCELADO">Parcelado</option>
              </Field>
              <label htmlFor="">Quantas Parcelas</label>
              <Field 
                name="parcela_numero" 
                component="select"
                placeholder="numero de parcela">
                <option value="0" >selecio quantas vezes</option>
                <option value="x1" >Parcela x1</option>
                <option value="x2" >Parcela x2</option>
                <option value="x3" >Parcela x3</option>
                <option value="x4" >Parcela x4</option>
                <option value="x5" >Parcela x5</option>
                <option value="x6" >Parcela x6</option>
                <option value="x7" >Parcela x7</option>
                <option value="x8" >Parcela x8</option>
                <option value="x9" >Parcela x9</option>
                <option value="x10" >Parcela x10</option>
                <option value="x11" >Parcela x11</option>
                <option value="x12" >Parcela x12</option>
              </Field>
            </div>

            <div className="final">
              <label>Tipo de Parcelamento</label>
              <Field name="tipo_parcela" component="select" placeholder="parcela">
                <option value="0" >selecione um caixa</option>
                <option value="PAGO" >Pago</option>
                <option value="BOLETO" >Boleto</option>
                <option value="CARTAO-CREDITO" >Cartão de credito</option>
              </Field>
              <label>Valor Parcelas</label>
              <Field  name="parcela_valor" type="number" placeholder="valor"/>
            </div>

            <div className="but">
              <button type="submit">Confirmar venda</button>
              <button className="cancela">
                <Link to="/listProducts">
                  Cancelar venda
                </Link>
              </button>
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

