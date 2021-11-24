import React, { useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import {
  createFinancialBoxRequest,
  findAllFinancialBoxRequest,
  UpdateFinancialBoxRequest,
  resetFormulario,
} from '~/store/modules/financialBox/actions';
import { getByIdServiceFinancialBoxValorTotalRequest } from '~/store/modules/servicos/actions';
import { getByIdSalesFinancialBoxValorTotalRequest } from '~/store/modules/sales/actions';

import { Container } from './styles';
import Header from '~/components/HeaderListAndRegister';

export default function Caixa() {
const dispatch = useDispatch();
const caixa = useSelector((state) => state.financialBox.financialBoxList);
const { totalService } = useSelector((state) => state.servicos.servicoList);
const { totalSales } = useSelector((state) => state.sales.salesList);

  useEffect(() => {
    dispatch(findAllFinancialBoxRequest());
    if (caixa[0].id) {
      dispatch(getByIdServiceFinancialBoxValorTotalRequest(caixa[0].id));
      dispatch(getByIdSalesFinancialBoxValorTotalRequest(caixa[0].id));
    } else {
      dispatch(resetFormulario());
    }
  }, [caixa[0].id, dispatch]);
  
const handleSubmit = async (values, { resetForm }) => {
  try {
    let body = JSON.parse(JSON.stringify(values));

    if (caixa[0]) {
      dispatch(UpdateFinancialBoxRequest({ id: caixa[0].id, values: body }));
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
        <Form onSubmit={handleSubmit} initialData={caixa[0]} >
          <div className="statos">
            <h2>Data Abertura Caixa</h2>
            <Input name="open_caixa" type="date" />
            <h2>Data Fechamento Caixa</h2>
            <Input name="close_caixa" type="date" />
          </div>
          <div className="tipo-venda">
            <h2>Valor Total Vendas</h2>
            <Input name="valor_sales_total" value={totalSales} type="number" placeholder="valor"/>
            <h2>Valor Total Serviços</h2>
            <Input name="valor_service_total" value={totalService} type="number" placeholder="valor"/>
            <h2>Valor Total Caixa</h2>
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

