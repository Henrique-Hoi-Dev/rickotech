import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';
import Adress from '~/pages/Profile/Adress';
import Caixa from '~/pages/Caixa';
import CaixaInfo from '~/pages/Caixa/CaixaInfo';
import Sales from '~/pages/Sales';
import EditSales from '~/pages/Sales/EditSales';
import Dashboard from '~/pages/Dashboard';
import RegistrationProduct from '~/pages/Product'
import RegistrationServices from '~/pages/Works'
import ListProduct from '~/pages/Product/ListProduct';
import ListService from '~/pages/Works/ListWorks';

function RoutesApp() {
  return (
    <Switch>
      <Route path="/" exact component={props => <SignIn {...props} />} />
      <Route path="/register" exact component={props => <SignUp {...props} />} />
      <Route isPrivate path="/perfil/:id" exact component={props => <Profile {...props} />} />
      <Route isPrivate path="/adress/:id" exact component={props => <Adress {...props} />} />
      <Route isPrivate path="/caixa/:id" exact component={props => <Caixa {...props} />} />
      <Route isPrivate path="/caixaInfo/:id" exact component={props => <CaixaInfo {...props} />} />
      <Route isPrivate path="/sales/:id" exact component={props => <Sales {...props} />} />
      <Route isPrivate path="/editSales/:id" exact component={props => <EditSales {...props} />} />
      <Route isPrivate path="/dashboard" exact component={props => <Dashboard {...props} />} />
      <Route isPrivate path="/registreProduct" exact component={props => <RegistrationProduct {...props} />} />
      <Route isPrivate path="/registreServices" exact component={props => <RegistrationServices {...props} />} />
      <Route isPrivate path="/listProducts" exact component={props => <ListProduct {...props} />} />
      <Route isPrivate path="/listServico" exact component={props => <ListService {...props} />} />
      <Route isPrivate path="/product/:id" exact component={props => <RegistrationProduct {...props} />} />
    </Switch>
  );
}

export default RoutesApp;
