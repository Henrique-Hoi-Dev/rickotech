import React, { useEffect } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// import {
//   createVendatRequest,
//   getByIdVendaRequest,
//   UpdateVendaRequest,
//   resetFormulario,
// } from '~/store/modules/sales/actions';

import { Container } from './styles';
import Header from '~/components/HeaderListAndRegister';

export default function Sales() {
const dispatch = useDispatch();
const { id } = useParams();
const { form } = useSelector((state) => state.sales);

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getByIdVendaRequest(id));
  //   } else {
  //     dispatch(resetFormulario());
  //   }
  // }, [id, dispatch]);
  
// const handleSubmit = async (values, { resetForm }) => {
//   try {
//     let body = JSON.parse(JSON.stringify(values));

//     if (id) {
//       dispatch(UpdateVendaRequest({ id: id, values: body }));
//     } else {
//       dispatch(createVendatRequest(body));

//       handleReset(resetForm);
//     }
//   } catch (error) {
//     toast.error('Error nos dados');
//   }
// };

// const handleReset = (resetForm) => {
//   resetForm({});
// };

  return (
    <>
    <Header title="Caixa"/>
      <Container>  
        <Form 
        initialData={form} 
        // onSubmit={handleSubmit}
        >
          <div className="statos">
            <h2>Data Abertura Caixa</h2>
            <Input name="open_caixa" type="date" />
            <h2>Data Fechamento Caixa</h2>
            <Input name="close_caixa" type="date" />
          </div>
          <div className="tipo-venda">
            <h2>Valor Total Vendas</h2>
            <Input name="valor_sales_total" type="number" placeholder="valor"/>
            <h2>Valor Total Serviços</h2>
            <Input name="valor_service_total" type="number" placeholder="valor"/>
            <h2>Valor Total Caixa</h2>
            <Input name="valor_total" type="number" placeholder="valor"/>
          </div>
         <div className="but">
            <button type="submit">Salvar</button>
          </div>
        </Form>
      </Container>      
    </>
  );
}

