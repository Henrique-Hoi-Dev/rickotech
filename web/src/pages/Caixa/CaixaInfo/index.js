import React, { useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from '@rocketseat/unform';

import * as moment from 'moment';

import { toast } from 'react-toastify';

import { 
  getByIdFinancialBoxRequest, 
  UpdateFinancialBoxRequest } from "~/store/modules/financialBox/actions";

import { Container } from "./styles";

import Header from "~/components/HeaderListAndRegister";

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
    const { close_caixa } = values
    const body = { status: true, close_caixa}

    try {
      dispatch(UpdateFinancialBoxRequest( id, body ));
    } catch {
      toast.error('Error check data');
    } 
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
                  type={"date"}
                  name="close_caixa" 
                  style={{ display: (form.status === true && 'none') || 
                  (form.status === false && 'line-through') }}        
                />
                <span 
                style={{ 
                  display: (form.status === false && 'none') ||
                  (form.status === true && 'line-through')
                }}
                >{moment(form.close_caixa).format('DD/MM/YYYY')}</span>
                <label htmlFor="value_total">Valor total</label>
                <span>{currencyFormat(form.value_total || [0])}</span>
              </div>

              <div className="info2">
                <label htmlFor="value_open">Valor abertura</label>
                <span>{currencyFormat(form.value_open || [0])}</span>
                <label htmlFor="value_total_sales">Valor total vendas</label>
                <span>{currencyFormat(form.value_total_sales || [0])}</span>
                <label htmlFor="value_total_service">Valor total serviços</label>
                <span>{currencyFormat(form.value_total_service || [0])}</span>
                <div className="check">
                  <Input name="status" type={"checkbox"} />          
                </div>
              </div>

              <div className="button">
                <div className="button-close"
                  style={{ 
                    display: (form.status === true && 'none') ||
                    (form.status === false && 'line-through') }}>
                      
                  <button type="submit">Fechar caixa</button>
                </div>
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