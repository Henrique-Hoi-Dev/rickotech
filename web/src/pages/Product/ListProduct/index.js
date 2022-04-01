import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Container } from './styles';

import { findAllProductRequest  } from '../../../store/modules/product/actions';

import Header from '../../../components/HeaderListAndRegister';
import CardProduct from '../../../components/CardProduct';

import img from '../../../assets/empty.png'

const ProductList = ({ productList }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function onLoad() {
      dispatch(findAllProductRequest());
    }
    onLoad();
  }, [dispatch]);

  return (
    <Container>
      <Header title="Produtos"/>
      <div className="header-main">
        <form className="form-table">
          {[].concat(productList).map((produto, i) => (
          <CardProduct 
            key={i}
            id={produto.id} 
            name={produto.name}
            categoria={produto.category}
            valor={produto.price}
            quantidade={produto.quantity} 
            img={produto.avatar
            ? produto.avatar.url
            : (img)} />
          ))}
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

export default connect(mapStateToProps)(ProductList);
