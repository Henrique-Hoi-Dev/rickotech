import React from 'react';

import ListSales from '../Sales/ListSales';
import Footer from '~/components/Footer';
import Card from './Card';

import { Container } from './styles'

export default function Dashboard() {
  
  return (
      <Container> 
        <Card />
        <ListSales />
        <Footer />
      </Container>
  );
}