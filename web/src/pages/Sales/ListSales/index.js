import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { Container } from './styles';
import { FcEmptyTrash } from 'react-icons/fc';

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import MouseOverPopover from '~/components/MouseOverPopover';

import ModalSales from '../modalSales/modalSales';

import { currencyFormat } from '~/util/mask';

import { findAllSalesRequest } from '../../../store/modules/sales/actions';

import img from '../../../assets/empty.png'
import ModalDelete from '../modalDelete/modalDelete';

const ListSales = ({ salesList }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false)
  const [showModalDelete, setModalShowDelete] = useState(false)

  const [salesId, setSalesId] = useState('')
  const [DeleteId, setDeleteId] = useState('')

  const user = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (salesId) {
      const inter = setInterval(() => {
        setSalesId('')
      }, 500);

      return () => clearInterval(inter)
    }
  }, [salesId, setSalesId]);

  useEffect(() => {
    if(user.id) {
      dispatch(findAllSalesRequest(user.id));
    }
  }, [dispatch, user]);

  return (
    <Container>
      <div className="header-main">
        <form className="form-table">
          <table className="table-list">
            <thead>
              <tr className="table-title">
                <td>Vendedor</td>
                <td>Nome Produto</td>
                <td>Quantidade</td>
                <td>Valor Produto</td>
                <td>Desconto</td>
                <td>Imagem</td>
                <td>Status Venda</td>
              </tr>
            </thead>
            <tbody>
              {[].concat(salesList).map((sales, i) => (
                <tr key={i} value={sales.id} >
                  <td>{sales.user.name}</td>
                  <td>{sales.name_product}</td>
                  <td>{sales.product_quantity || [0]}</td>
                  <td>{currencyFormat(sales.price_total || [0])}</td>
                  <td>{sales.discount}%</td>
                  <td className="avatar">
                    <img
                      src={
                        sales.products.avatar
                          ? sales.products.avatar.url
                          : (img)
                      }
                      alt="avatar"
                      className="avatar"
                    />
                  </td>
                  <td style={{ borderRadius: '30px', color: '#fff', width: '12px',
                               backgroundColor: (sales.status === 'open' && 'green') ||
                                                (sales.status === 'closed' && 'red') || 
                                                (sales.status === 'sold' && 'orange') }}>
                      {(sales.status === 'open' && 'Em Aberto') || 
                       (sales.status === 'closed' && 'Fechado') || 
                       (sales.status === 'sold' && 'Vendido')}
                  </td>
                  <td style={{ display: (sales.status === 'sold' && 'none') ||
                      (sales.status === 'open' && 'closed' && 'line-through')}}>
                    <MouseOverPopover 
                      children={
                        <ProductionQuantityLimitsIcon 
                          onClick={() => setShowModal(!showModal) || setSalesId(sales.id)}
                        />
                      }
                      text={"Finalizar Venda/Editar"}
                    />
                  </td>
                  <td>
                    <MouseOverPopover 
                      children={<FcEmptyTrash onClick={() => setModalShowDelete(!showModalDelete) || setDeleteId(sales.id)}/>}
                      text={"Excluir venda"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>

      <ModalSales 
        showModal={showModal}
        setShowModal={setShowModal}
        ids={salesId}
      />

      <ModalDelete 
        setShowModal={setModalShowDelete}
        showModal={showModalDelete}
        ids={DeleteId}
      />

    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    salesList: state.sales.salesList ? state.sales.salesList : [],
  };
};

export default connect(mapStateToProps)(ListSales);
