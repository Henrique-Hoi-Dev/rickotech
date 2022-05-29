import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { 
  UpdateSalesRequest, 
  getByIdSalesRequest,
  resetFormularioSales } from '~/store/modules/sales/actions';
import { Container } from './styles';

import Modal from '~/components/modal/modal'
import CloseIcon from '@mui/icons-material/Close';

export default function ModalSales({ showModal, setShowModal, ids }) {
const dispatch = useDispatch();

const { formSales } = useSelector((state) => state?.sales);

useEffect(() => {
  if (ids) {
    dispatch(getByIdSalesRequest(ids));
  }
}, [ids, dispatch]);
  
const handleSubmit = async (values) => {
  dispatch(UpdateSalesRequest(values, formSales.id));
  onCloseSales()
};

const onCloseSales = () => {
  setShowModal(false);
  dispatch(resetFormularioSales())
};

  return (
    <Modal 
      open={showModal}
      onClose={onCloseSales}
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
          <h1>Editar / finalizar Venda</h1>
        </div>
        
        <Formik
          onSubmit={handleSubmit}
          enableReinitialize={true}
          initialValues={formSales} > 
          <Form >
            <div className="statos">        
              <label htmlFor="status">Status de Venda</label>
              <Field name="status" component="select" >
                <option value="0" >selecione uma opção</option>
                <option value={"open" || ""} >Em Aberto</option>
                <option value={"closed" || ""}>Cancelar</option>
                <option value={"sold" || ""}>Vendido</option>
              </Field>
            </div>
            
            <div className="tipo-venda">
              <label htmlFor="discount">% Desconto</label>
              <Field name="discount" /> 
            </div>

            <div className="tipo-venda-1">
              <label htmlFor="product_quantity">Quantidade</label>
              <Field name="product_quantity" />
            </div>
            <div className="tipo-venda-2">
              <Field name="product_id" />
            </div>

            <div className="but">
              <button type="submit">Confirmar venda</button>
            </div>
          </Form>
        </Formik> 
      </Container> 
    </Modal>
  );
}
