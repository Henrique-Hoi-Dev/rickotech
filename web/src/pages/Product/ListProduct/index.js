import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Container } from './styles';
import Header from '../../../components/HeaderListAndRegister';
import { FcEmptyTrash, FcSalesPerformance } from 'react-icons/fc';
import { BiEdit } from 'react-icons/bi';

import { Link } from 'react-router-dom';
import {
  findAllProductRequest,
  deleteProductRequest,
} from '../../../store/modules/product/actions';

import img from '../../../assets/empty.png'

const ProductList = ({ productList, handlerRemoveProduct }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function onLoad() {
      dispatch(findAllProductRequest());
    }
    onLoad();
  }, [dispatch]);

  //formatção do preço do produto
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
    <Container>
      <Header  title="Todos os produtos"/>
      <div className="header-main">
        <form className="form-table">
          <table className="table-list">
            <thead>
              <tr className="table-title">
                <td>Nome</td>
                <td>Valor</td>
                <td>Categoria</td>
                <td>Quantidade</td>
                <td>Avatar</td>
              </tr>
            </thead>
            <tbody>
              {[].concat(productList).map((produto, i) => (
                <tr key={i} value={produto.id}>
                  <td>{produto.name}</td>
                  <td>{currencyFormat(produto.price)}</td>
                  <td>{produto.category}</td>
                  <td>{produto.quantity}</td>
                  <td className="avatar">
                    <img
                      src={
                        produto.avatar
                          ? produto.avatar.url
                          : (img)
                      }
                      alt="avatar"
                      className="avatar"
                    />
                  </td>
                  <td>
                    <button>
                      <Link to={`/product/${produto.id}`}>
                        <BiEdit />
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button onClick={(e) => handlerRemoveProduct(e, produto.id)}>
                      <FcEmptyTrash />
                    </button>
                  </td>
                  <td>
                    <button >
                      <Link to={`/sales/${produto.id}`}>
                        < FcSalesPerformance/>
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    productList: state.product.productList ? state.product.productList : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlerRemoveProduct: async (e, id) => {
      e.preventDefault();
      const confirm = window.confirm(
        'Tem certeza que deseja remover esse produto?'
      );
      if (confirm) {
        dispatch(deleteProductRequest(id));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
