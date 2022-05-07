import React, { useEffect } from "react";
import Modal from "~/components/modal/modal";
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { FcHighPriority } from 'react-icons/fc';
import * as moment from 'moment';

import { createSalesRequest, resetFormulario } from '~/store/modules/sales/actions';
import { 
  getByIdProductRequest, 
  resetFormularioProduct } from '~/store/modules/product/actions';
import { findAllOpenRequest } from '~/store/modules/financialBox/actions';
import CloseIcon from '@mui/icons-material/Close';

import { Container } from './styles';

const ModalSales = ({ showModal, setShowModal, ids }) => {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.sales);

  const financialBoxListOpen = useSelector((state) => state.financialBox.financialBoxListOpen);
  const user = useSelector((state) => state.user.profile);
  const product = useSelector((state) => state.product.form);

  useEffect(() => {
    if (ids) {
      dispatch(getByIdProductRequest(ids));
      dispatch(findAllOpenRequest(user.id));
    }
  }, [ids, dispatch, user]);
    
  const handleSubmit = async (values) => {
    dispatch(createSalesRequest(values, product.id));
    dispatch(resetFormularioProduct());
    dispatch(resetFormulario())
    setShowModal(false);
  };

  const onCloseSales = () => {
    setShowModal(false);
    dispatch(resetFormularioProduct());
    dispatch(resetFormulario())
  };

  return (
      <Modal
        open={showModal}
        onClose={onCloseSales}
        maxWidth={"700px!important"}
      >

        <Container>
          <div className="header">
            <CloseIcon 
              sx={{ 
                width: "1.5em", 
                height: "1.5em", 
                marginTop: "20px",
                cursor: "pointer", 
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
                borderRadius: "50%" 
              }} 
              onClick={onCloseSales}
            />
            <h1>Registro Venda</h1>
          </div>
          
          <Formik
            onSubmit={handleSubmit}
            enableReinitialize={true}
            initialValues={form} 
          > 
            <Form >
              <div className="statos">
                <label htmlFor="name_product">Nome do Produto</label>
                <Field name="name_product" component="select" >
                  <option value="0" >selecione o nome</option>
                  <option value={product.name || ''} >{product.name || ''}</option>
                </Field>
                <label htmlFor="price_product">Valor do Produto</label>
                <Field name="price_product" component="select" >
                  <option value="0" >selecione o valor</option>
                  <option value={product.price || ''}>{product.price || ''}</option>
                </Field>
              </div>
              
              <div className="tipo-venda">
                <label htmlFor="financial_id">Caixa</label>
                <Field component="select" name="financial_id" >
                  <option value="0">Selecione um caixa</option>
                  {[].concat(financialBoxListOpen).map((caixa, i) => (
                  <option key={i} value={caixa.id || ''} >
                  {moment(caixa.open_caixa).format('DD/MM/YYYY')} /
                  {(caixa.status === false && 'Aberto')}
                  </option>
                  ))}    
                </Field>
                <label htmlFor="discount">% Desconto</label>
                <Field name="discount" type="number" />  
              </div>

              <div className="tipo-venda-1">
                <label htmlFor="product_quantity">Quantidade</label>
                <Field name="product_quantity" type="number" />
              </div>
              <div className="tipo-venda-2">
                <label htmlFor="status">Status de Venda</label>
                <Field name="status" component="select" >
                  <option value="0" >selecione uma opção</option>
                  <option value="open" >Em Aberto</option>
                  <option value="closed">Fechado</option>
                  <option value="sold">Vendido</option>
                </Field>
              </div>

              <div className="but">
                <button type="submit">Confirmar venda</button>
              </div>
              <p>
                <FcHighPriority />
                  Importante!<br/>
                  Preencha todos os dados!
              </p>
            </Form>
          </Formik> 
        </Container> 
      </Modal>
  )
}

export default ModalSales;