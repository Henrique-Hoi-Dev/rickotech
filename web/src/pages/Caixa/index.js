import React, { useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import {
  createFinancialBoxRequest,
  UpdateFinancialBoxRequest,
  findAllFinancialBoxRequest,
  getByIdFinancialBoxRequest,
  resetFormulario } from '~/store/modules/financialBox/actions';
import { getByIdServiceFinancialBoxValorTotalRequest } from '~/store/modules/servicos/actions';
import { getByIdSalesFinancialBoxValorTotalRequest } from '~/store/modules/sales/actions';

import { Container } from './styles';
import Header from '~/components/HeaderListAndRegister';

export default function Caixa() {
const dispatch = useDispatch();
const id = useSelector((state) => state.financialBox.financialBoxList);
const { form } = useSelector((state) => state.financialBox);
const { totalService } = useSelector((state) => state.servicos.servicoList);
const { totalSales } = useSelector((state) => state.sales.salesList);
console.log(id)

  useEffect(() => {
    function onLoad() {
      // dispatch(findAllFinancialBoxRequest());
    }
    onLoad();
    if (id) {
      dispatch(getByIdFinancialBoxRequest(id));
      dispatch(getByIdServiceFinancialBoxValorTotalRequest(id));
      dispatch(getByIdSalesFinancialBoxValorTotalRequest(id));
    } else {
      dispatch(resetFormulario());
    }
  }, [id, dispatch]);
  
const handleSubmit = async (values, { resetForm }) => {
  try {
    let body = JSON.parse(JSON.stringify(values));

    if (id) {
      dispatch(UpdateFinancialBoxRequest({ id: id, values: body }));
    } else {
      dispatch(createFinancialBoxRequest(values));

      handleReset(resetForm);
    }
  } catch (error) {
    toast.error('Error nos dados');
  }
};

const total = totalService + totalSales

const handleReset = (resetForm) => {
  resetForm({});
};

  return (
    <>
    <Header title="Caixa"/>
      <Container>  
        <Form 
          onSubmit={handleSubmit} 
          initialData={form} 
        >
          <div className="statos">
            <label>Data Abertura Caixa</label>
            <Input name="open_caixa" type="date" />
            <label>Data Fechamento Caixa</label>
            <Input name="close_caixa" type="date" />
          </div>
          <div className="tipo-venda">
            <label>Valor Total Vendas</label>
            <Input name="valor_sales_total" value={totalSales} type="number" placeholder="valor"/>
            <label>Valor Total Serviços</label>
            <Input name="valor_service_total" value={totalService} type="number" placeholder="valor"/>
            <label>Valor Total Caixa</label>
            <Input name="valor_total" value={total} type="number" placeholder="valor"/>
          </div>
          <div className="but">
            <button type="submit">Salvar</button>
            <button>
              <Link to="/#">
                Cria um novo caixa
              </Link>
            </button>
          </div>
        </Form>
      </Container>      
    </>
  );
}

