import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Container } from './styles';
import { FcEmptyTrash } from 'react-icons/fc';
import { currencyFormat } from '~/util/mask';
import { findAllSalesRequest } from '../../../store/modules/sales/actions';

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import MouseOverPopover from '~/components/MouseOverPopover';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ModalSalesEdit from '../modalSalesEdit/modalSales';
import ModalDelete from '../modalDelete/modalDelete';
import img from '../../../assets/empty.png'
import ModalSales from '../modalSales/modalSales';

const ListSales = ({ salesList }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false)
  const [showModalSales, setShowModalSales] = useState(false)
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
        <div className='more' >
          <MouseOverPopover 
            children={
              <AddCircleSharpIcon onClick={() => setShowModalSales(!showModalSales) }
                sx={{ 
                  height: "2em", 
                  width: "2em", 
                  cursor: "pointer", 
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
                  borderRadius: "50%" 
                }}
              />
            }
            text={"Novo venda"}
          />
        </div>
        <form className="form-table">
          <table className="table-list">
            <thead>
              <tr>
                <th>Vendedor</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Valor</th>
                <th>Desconto</th>
                <th></th>
                <th>Status</th>
                <th></th>
              </tr> 
            </thead>
            <tbody>
              {[].concat(salesList).map((sales, i) => (
                <tr key={i} value={sales.id} >
                  <td>{sales.user.name}</td>
                  <td>{sales.name_product}</td>
                  <td>{sales.product_quantity}</td>
                  <td>{currencyFormat(sales.price_total || [0])}</td>
                  <td>{sales.discount}%</td>
                  <td className="avatar">
                    <img
                      src={sales.products.avatar ? sales.products.avatar.url : (img)}
                      alt="avatar"
                      className="avatar"
                    />
                  </td>
                  <td style={{ 
                    borderRadius: '30px', 
                    color: '#fff', 
                    width: '12px',
                    backgroundColor: 
                      (sales.status === 'open' && 'green') ||
                      (sales.status === 'closed' && 'red') || 
                      (sales.status === 'sold' && 'orange') }}
                  >
                    {
                      (sales.status === 'open' && 'Em Aberto') || 
                      (sales.status === 'closed' && 'Cancelado') || 
                      (sales.status === 'sold' && 'Vendido')
                    }
                  </td>
                  {sales.status === 'open' && (
                    <td>
                      <MouseOverPopover 
                        children={
                          <ProductionQuantityLimitsIcon 
                            onClick={() => setShowModal(!showModal) || setSalesId(sales.id)}
                          />
                        }
                        text={"Editar / Finalizar Venda"}
                      />
                    </td>
                  )}
                  {(sales.status === 'open' || sales.status === 'sold') && (
                    <td>
                      <MouseOverPopover 
                        children={<FcEmptyTrash onClick={() => setModalShowDelete(!showModalDelete) || setDeleteId(sales.id)}/>}
                        text={"Excluir"}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      
      <ModalSales 
        showModal={showModalSales}
        setShowModal={setShowModalSales}
        // ids={productId}
      />

      <ModalSalesEdit 
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
