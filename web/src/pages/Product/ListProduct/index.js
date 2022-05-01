import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { findAllProductRequest  } from '../../../store/modules/product/actions';

import Header from '../../../components/Header';
import CardProduct from '../../../components/CardProduct';
import ModalRegistrationProduct from '../../../components/CardProduct/modalRegistrationProduct/modalRegistrationProduct'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';

import img from '../../../assets/empty.png'

import { Container } from './styles';

const ProductList = ({ productList }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    function onLoad() {
      dispatch(findAllProductRequest());
    }
    onLoad();
  }, [dispatch]);

  return (
    <Container>
      <Header title="Produtos"/>
      <ModalRegistrationProduct
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="header-main">
        <div className='more' >
          <AddCircleSharpIcon onClick={() => setShowModal(!showModal) }
            sx={{ 
              height: "2em", 
              width: "2em", 
              cursor: "pointer", 
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
              borderRadius: "50%" 
            }} 
          />
        </div>
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
              : (img)} 
            />
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
