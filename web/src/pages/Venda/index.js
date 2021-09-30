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
      <Container>
        <Form initialData={form} onSubmit={handleSubmit}>
          <Input name="valor" type="text" />
          <h2>Valor do produto</h2>

          <Input name="valor_desconto" type="text" />
          <h2>Desconto</h2>

          <Input name="produto_id" type="text" />
          <h2>Nome do produto</h2>

          <Select
            options={tipoPagamento}
            name="tipo_pagamento"
            type="text"
          />
          <h2>Tipo de venda</h2>

          <Select
            options={tipoParcelamento}
            name="tipo_parcela"
            type="text"
          />
          <h2>Tipo de parcelamento</h2>

          <Input  name="valor_parcela" type="text" />
          <h2>Valor Parcelas</h2>

          <Input  name="parcelas" type="text" />
          <h2>Parcelas</h2>

          <Input  name="valor_pendente" type="text" />
          <h2>Valor pendente</h2>

        <div>
             <button type="submit">Confirmar venda</button>
        </div>
        </Form>
      </Container>      
    </>
  );
}

