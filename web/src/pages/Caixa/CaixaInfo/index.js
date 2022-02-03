import React, { useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "~/components/HeaderListAndRegister";
import { Form, Input } from '@rocketseat/unform';
import * as moment from 'moment';

import { 
  getByIdFinancialBoxRequest, 
  UpdateFinancialBoxRequest } from "~/store/modules/financialBox/actions";

import { Container } from "./styles";

export default function CaixaInfo() {
  const dispatch = useDispatch(); 
  const userId = useSelector((state) => state.user.profile.id);

  const { form } = useSelector((state) => state.financialBox);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getByIdFinancialBoxRequest(id));
    } 
  }, [id, dispatch]);

  const handleSubmit = async (values) => {
      dispatch(UpdateFinancialBoxRequest(id, values));
  };

  function currencyFormat(num) {
    if (num) {
      return (
        'R$' +
        parseFloat(num)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      );
    }
  }

  return (
    <>
      <Header title="Caixa Info"/>
      <Container>
        <Form onSubmit={handleSubmit} initialData={form} >
          <div className="header-main">
            <div className="form">
              <div className="info1">
                <label htmlFor="open_caixa">Data abertura caixa</label>
                <span>{moment(form.open_caixa).format('DD/MM/YYYY')}</span>
                <label htmlFor="close_caixa">Data fechamento caixa</label>
                <Input 
                style={{ 
                  display: (form.status === true && 'none') || 
                  (form.status === false && 'line-through') }}
                  name="close_caixa" 
                  type="date"
                />
                <span 
                style={{ 
                  display: (form.status === false && 'none') ||
                  (form.status === true && 'line-through')
                }}
                >{moment(form.close_caixa).format('DD/MM/YYYY')}</span>
                <label htmlFor="valor_total">Valor total</label>
                <span>{currencyFormat(form.valor_total || '0')}</span>
              </div>

              <div className="info2">
                <label htmlFor="valor_open">Valor abertura</label>
                <span>{currencyFormat(form.valor_open || '0')}</span>
                <label htmlFor="valor_sales_total">Valor total vendas</label>
                <span>{currencyFormat(form.valor_sales_total || '0')}</span>
                <label htmlFor="valor_service_total">Valor total serviços</label>
                <span>{currencyFormat(form.valor_service_total || '0')}</span>
                <div className="check">
                  <Input name="status" type="checkbox" value={true} />          
                  {/* <label htmlFor="status">Fechamento caixa</label> */}
                </div>
              </div>

              <div className="button">
                <button type="submit">Fechar caixa</button>
                  <Link to={`/caixa/${userId}`}>
                    <button>
                      Lista caixa
                    </button>
                  </Link>
              </div>
            </div>
          </div>
        </Form>
      </Container>
    </>
  )
}