import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardFooter from 'components/Card/CardFooter.js';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

import { useDispatch, useSelector } from "react-redux";
import { getCardRequest } from '~/store/modules/financialBox/actions';

const useStyles = makeStyles(styles);

export default function Cards() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { card } = useSelector((state) => state.financialBox);

  useEffect(() => {
      dispatch(getCardRequest());
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
    <GridContainer>
      <GridItem xs={12} sm={6} md={3}>
        <Card>
          <CardHeader color="warning" stats icon>
            <CardIcon color="warning">
              <AttachMoneyIcon />
            </CardIcon>
            <p className={classes.cardCategory}>Valor total vendas</p>
            <h3 className={classes.cardTitle}>{currencyFormat(card.totalOrder || [0])}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <AttachMoneyIcon />
              Últimas 24 Horas
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={3}>
        <Card>
          <CardHeader color="success" stats icon>
            <CardIcon color="success">
              <AttachMoneyIcon />
            </CardIcon>
            <p className={classes.cardCategory}>Valor total produtos</p>
            <h3 className={classes.cardTitle}>{currencyFormat(card.totalProduct || [0])}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              Últimas 24 Horas
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={3}>
        <Card>
          <CardHeader color="danger" stats icon>
            <CardIcon color="danger">
              <AttachMoneyIcon />
            </CardIcon>
            <p className={classes.cardCategory}>Valor total serviços</p>
            <h3 className={classes.cardTitle}>{currencyFormat(card.totalService || [0])}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              Últimas 24 Horas
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={3}>
        <Card>
          <CardHeader color="info" stats icon>
            <CardIcon color="info">
              <InventoryIcon />
            </CardIcon>
            <p className={classes.cardCategory}>Produtos em estoque</p>
            <h3 className={classes.cardTitle}>{card.totalQuantityProduct}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <LocalOffer />
              Rastreado do estoque
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
