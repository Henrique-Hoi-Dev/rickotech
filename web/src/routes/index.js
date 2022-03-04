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
import Dashboard from '~/pages/Dashboard';
import RegistrationProduct from '~/pages/Product'
import RegistrationServices from '~/pages/Works'
import ListProduct from '~/pages/Product/ListProduct';
import ListSales from '~/pages/Sales/ListSales';
import ListService from '~/pages/Works/ListWorks';

function RoutesApp() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />
      <Route isPrivate path="/perfil/:id" exact component={Profile} />
      <Route isPrivate path="/adress/:id" exact component={Adress} />
      <Route isPrivate path="/caixa/:id" exact component={Caixa} />
      <Route isPrivate path="/caixaInfo/:id" exact component={CaixaInfo} />
      <Route isPrivate path="/sales" exact component={Sales} />
      <Route isPrivate path="/dashboard" exact component={Dashboard} />
      <Route isPrivate path="/registreProduct" exact component={RegistrationProduct} />
      <Route isPrivate path="/registreServices" exact component={RegistrationServices} />
      <Route isPrivate path="/listProducts" exact component={ListProduct} />
      <Route isPrivate path="/listSales" exact component={ListSales} />
      <Route isPrivate path="/listServico" exact component={ListService} />
      <Route isPrivate path="/product/:id" exact component={RegistrationProduct} />
      <Route isPrivate path="/sales/:id" exact component={Sales}/>
    </Switch>
  );
}

export default RoutesApp;
