import React from 'react';

import ListSales from '../Sales/ListSales';
import Card from '~/components/Card';

import { Container } from './styles'

export default function Dashboard() {
  
  return (
      <Container> 
        <Card />
        <ListSales />
      </Container>
  );
}