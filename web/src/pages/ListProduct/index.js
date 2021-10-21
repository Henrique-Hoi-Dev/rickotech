import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as moment from 'moment';

import { Container } from './styles';
import Header from '../../components/HeaderList';
import { FcEmptyTrash, FcOk } from 'react-icons/fc';
import { BiEditAlt } from 'react-icons/bi';

import { Link } from 'react-router-dom';
import {
  findAllProductRequest,
  deleteProductRequest,
} from '../../store/modules/product/actions';

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
      <Header />
      <div className="header-main">
        <form className="form-table">
          <table className="table-list">
            <thead>
              <tr className="table-title">
                <td>Nome</td>
                <td>Valor</td>
                <td>Data Registro</td>
                <td>Categoria</td>
                <td>Avatar</td>
                <td>Editar</td>
                <td>Excluir</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {[].concat(productList).map((produto, i) => (
                <tr key={i} value={produto.id}>
                  <td>{produto.name}</td>
                  <td>{currencyFormat(produto.valor)}</td>
                  <td>{moment(produto.data_registro).format('DD-MM-YYYY')}</td>
                  <td>{produto.categoria}</td>
                  <td className="avatar">
                    <img
                      src={
                        produto.avatar
                          ? produto.avatar.url
                          : 'https://faculty.iiit.ac.in/~indranil.chakrabarty/images/empty.png'
                      }
                      alt="avatar"
                      className="avatar"
                    />
                  </td>
                  <td>
                    <button>
                      <Link to={`/product/${produto.id}`}>
                        <BiEditAlt />
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handlerRemoveProduct(e, produto.id)}
                    >
                      <FcEmptyTrash />
                    </button>
                  </td>
                  <td>
                    <button >
                      <Link to={`/venda/${produto.id}`}>
                        < FcOk/>
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
