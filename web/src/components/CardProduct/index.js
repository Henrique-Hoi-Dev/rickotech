import React, { useEffect, useState } from "react";

import { FcEmptyTrash, FcSalesPerformance, FcEditImage } from 'react-icons/fc';

import { useDispatch } from "react-redux";

import { Container } from './styles'
import { deleteProductRequest } from "~/store/modules/product/actions";
import ModalSales from "./modalSales/modalSales";
import ModalRegistrationProduct from "./modalRegistrationProduct/modalRegistrationProduct";

export default function CardProduct(props) {
  const dispatch = useDispatch();

  const [showModal, setModalShow] = useState(false)
  const [showModalProduct, setModalShowProduct] = useState(false)
  const [productId, setproductId] = useState('')

  useEffect(() => {
    if (productId) {
      const inter = setInterval(() => {
        setproductId('')
      }, 1000);

      return () => clearInterval(inter)
    }
  }, [productId, setproductId]);

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
  function capitalizeFirst(str) {
    var subst = str.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    return subst;
  }

  function handlerRemoveProduct (e, id) {
    e.preventDefault();
    const confirm = window.confirm(
      'Tem certeza que deseja remover esse produto?'
    );
    if (confirm) {
      dispatch(deleteProductRequest(id));
    }
  }

  return (
    <Container>
      <div className="cards">
        <div className="avatar">
          <img src={props.img} alt="img" />
        </div>
        <hr />
        <div className="area-1"> 
          <hr />
          <h2>Nome</h2>    
          <strong>{props.name}</strong>
        </div>
        <div className="area-2">
          <hr />
          <h2>Categoria</h2>    
          <strong>
            {capitalizeFirst(props.categoria)} 
          </strong>
        </div>
        <div className="area-3">
          <hr />     
          <h2>Valor</h2>    
          <strong>{currencyFormat(props.valor)}</strong>
        </div>
        <hr />
        <div className="area-4">
          <hr />
          <h2>Quantidade</h2>    
          <strong>{props.quantidade}</strong>
        </div>
        <div className="area-5">
          <hr />
          <FcEditImage style={{ cursor: "pointer" }}
            onClick={() => setModalShowProduct(!showModalProduct) || setproductId(props.id)}
          />
          <FcSalesPerformance style={{ cursor: "pointer" }}
            onClick={() => setModalShow(!showModal) || setproductId(props.id)}
          />
          <FcEmptyTrash style={{ cursor: "pointer" }}
            onClick={(e) => handlerRemoveProduct(e, props.id)}
          />
        </div>
      </div>
      <ModalSales 
        showModal={showModal}
        setShowModal={setModalShow}
        ids={productId}
      />
      <ModalRegistrationProduct 
        setShowModal={setModalShowProduct}
        showModal={showModalProduct}
        ids={productId}
      /> 
    </Container>
  )
}
