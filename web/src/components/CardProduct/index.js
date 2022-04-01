import React from "react";

import { FcEmptyTrash, FcSalesPerformance } from 'react-icons/fc';
import { BiEdit } from 'react-icons/bi';

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Container } from './styles'
import { deleteProductRequest } from "~/store/modules/product/actions";

export default function CardProduct(props) {
  const dispatch = useDispatch();

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
          <strong>{props.categoria}</strong>
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
          <button>
            <Link to={`/product/${props.id}`}>
              <BiEdit />
            </Link>
          </button>
          <button >
            <Link to={`/sales/${props.id}`}>
              < FcSalesPerformance/>
            </Link>
          </button>
          <button onClick={(e) => handlerRemoveProduct(e, props.id)}>
            <FcEmptyTrash />
          </button>
        </div>
      </div>
    </Container>
  )
}
