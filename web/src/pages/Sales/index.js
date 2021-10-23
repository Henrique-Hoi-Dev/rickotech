import React, { useEffect } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  createVendatRequest,
  getByIdVendaRequest,
  UpdateVendaRequest,
  resetFormulario,
} from '~/store/modules/venda/actions';

import { Container } from './styles';
import Header from '~/components/HeaderListAndRegister';

const tipoParcelamento = [
  { id: 'Cartão de credito', title: 'Cartão de credito' },
  { id: 'Boleto', title: 'Boleto' },
];

const tipoPagamento = [
  { id: 'Avista', title: 'Avista' },
  { id: 'Parcelado', title: 'Parcelado' },
];

export default function Venda() {
const dispatch = useDispatch();
const { id } = useParams();
const { form } = useSelector((state) => state.venda);

  useEffect(() => {
    if (id) {
      dispatch(getByIdVendaRequest(id));
    } else {
      dispatch(resetFormulario());
    }
  }, [id, dispatch]);
  
const handleSubmit = async (values, { resetForm }) => {
  console.log(values)
  try {
    let body = JSON.parse(JSON.stringify(values));

    if (id) {
      dispatch(UpdateVendaRequest({ id: id, values: body }));
    } else {
      dispatch(createVendatRequest(body));

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
        <Form initialData={form} onSubmit={handleSubmit}>
          <div className="statos">
            <h2>Nome</h2>
            <Input name="produto_id" type="text" />
            <h2>Desconto</h2>
            <Input name="valor_desconto" type="number" />
          </div>
          <div className="tipo-venda">
            <h2>Valor</h2>
            <Input name="valor" type="number" />
            
          </div>
          <div className="tipo-venda-1">
            <h2>Tipo de venda</h2>
              <Select
                options={tipoPagamento}
                name="tipo_pagamento"
                type="text"
              />
            <h2>Valor total</h2>
            <Input  name="valor_pendente" type="number" />
          </div>
          <div className="final">
            <h2>Tipo de parcelamento</h2>
            <Select
              options={tipoParcelamento}
              name="tipo_parcela"
              type="text"
            />
            <h2>Valor parcelas</h2>
            <Input  name="valor_parcela" type="number" />
          </div>
         <div className="but">
            <button type="submit">Confirmar venda</button>
            <button type="submit" className="cancela">Cancelar venda</button>
          </div>
        </Form>
      </Container>      
    </>
  );
}

