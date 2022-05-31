import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from '@rocketseat/unform';

import * as moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';

import { toast } from 'react-toastify';

import { 
  resetFormularioCaixa,
  getByIdFinancialBoxRequest,
  UpdateFinancialBoxRequest } from "../../../store/modules/financialBox/actions";

import { Container } from "./styles";

import Modal from "../../../components/modal/modal";

const ModalCaixaInfo = ({ showModal, setShowModal, id }) => {
  const dispatch = useDispatch(); 

  const { form } = useSelector((state) => state.financialBox);

  useEffect(() => {
    if (id) {
      dispatch(getByIdFinancialBoxRequest(id));
    }
  }, [id, dispatch]);

  const handleSubmit = async (values) => {
    const { close_caixa } = values
    const body = { status: true, close_caixa}

    try {
      dispatch(UpdateFinancialBoxRequest( form.id, body ));
      onCloseSales()
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

  const onCloseSales = () => {
    setShowModal(false);
    dispatch(resetFormularioCaixa())
  };


  return (
    <Modal
      open={showModal}
      onClose={onCloseSales}
    >
      <Container>
        <CloseIcon 
          sx={{ 
            width: "1.5em", 
            height: "1.5em", 
            margin: "20px",
            cursor: "pointer", 
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
            borderRadius: "50%" 
          }} 
          onClick={onCloseSales}
        />
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
              </div>
            </div>
          </div>
        </Form>
      </Container>
    </Modal>
  )
}

export default ModalCaixaInfo;