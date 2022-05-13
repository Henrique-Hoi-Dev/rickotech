import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';

import { connect, useDispatch, useSelector } from 'react-redux';

import * as moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';

import { FcHighPriority } from 'react-icons/fc';
import { Container } from './styles';

import {
  createServicetRequest,
  findAllServiceRequest,
  resetFormulario } from '~/store/modules/works/actions';

import { findAllOpenRequest } from '~/store/modules/financialBox/actions';
import Modal from '~/components/modal/modal';
  
const ModalWorks = ({ showModal, setShowModal, financialBoxListOpen,  }) => {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.works);
  
  const { id } = useSelector((state) => state.user.profile);

  useEffect(() => {
    dispatch(findAllOpenRequest(id));
    dispatch(resetFormulario());
  }, [id, dispatch]);

  const handleSubmit = async (values) => {
    dispatch(createServicetRequest(values, id));
    dispatch(findAllServiceRequest(id))
    setShowModal(false);
  };

  const onClose = () => {    
    setShowModal(false);
    dispatch(resetFormulario())
  };

  return (
    <Modal
        open={showModal}
        onClose={onClose}
        maxWidth={"700px!important"}
      >
        <Container>
        <CloseIcon 
            sx={{ 
              width: "1.5em", 
              height: "1.5em", 
              margin: "20px 0 -10px 27px",
              cursor: "pointer", 
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
              borderRadius: "50%" 
            }} 
            onClick={onClose}
          />
          <div className="header-main">
            <Formik
              onSubmit={handleSubmit}
              enableReinitialize={true}
              initialValues={form} >
                <Form className="form-input">
                  <div id="container-input" className="header-title">
                    <div className="campo2">
                      <label htmlFor="name">Nome do Serviço</label>
                      <Field  name="name" />

                      <label htmlFor="valor">Valor</label>
                      <Field type="number" name="price" />
                    </div>

                    <div className="campo" >
                      <label htmlFor="id">Caixa</label>
                      <Field  component="select" name="financial_id" >
                        <option value="0">Selecione um caixa</option>
                        {[].concat(financialBoxListOpen).map((caixa, i) => (
                          <option key={i} value={caixa.id} >
                          {moment(caixa.open_caixa).format('DD/MM/YYYY')} / 
                          {(caixa.status === false && 'Aberto')}
                          </option>
                        ))}    
                      </Field>   
                      <label htmlFor="data_serviço">Dia do serviço feito</label>
                      <Field name="date_service" type="date" />
                    </div> 

                    <footer className="buttons-container">
                        <p>
                          <FcHighPriority />
                          Preencha todos os dados!
                        </p>
                      <button type="submit">Salvar</button>
                    </footer>
                  </div>
                </Form>
            </Formik>
          </div>
        </Container>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    financialBoxListOpen: state.financialBox.financialBoxListOpen ? state.financialBox.financialBoxListOpen : [],
  };
};

export default connect(mapStateToProps) (ModalWorks)