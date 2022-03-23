import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCardRequest } from "~/store/modules/financialBox/actions";

import { Container } from './styles'

import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function Card() {
  const dispatch = useDispatch();

  const { card } = useSelector((state) => state.financialBox);
  console.log(card)

  useEffect(() => {
      dispatch(getCardRequest())
  }, [dispatch]);

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
      <div className="cards">
         <AttachMoneyIcon />
         <div className="value">     
            <h2>Total vendas</h2>    
            <strong>{currencyFormat(card.totalOrder)}</strong>
          </div>
      </div>
      <div className="cards">
        <AttachMoneyIcon />
        <div className="value">
          <h2>Total produtos</h2>
          <strong>{currencyFormat(card.totalProduct)}</strong>
        </div>
        
      </div>
      <div className="cards">
        <InventoryIcon />
        <div className="value">
          <h2>Total produtos em estoque</h2>
          <strong>{card.totalQuantityProduct}</strong>
        </div>
      </div>
      <div className="cards">           
        <AttachMoneyIcon />
        <div className="value">
          <h2>Total serviços</h2>
          <strong>{currencyFormat(card.totalService)}</strong>
        </div>
      </div>
    </Container>
  )
}