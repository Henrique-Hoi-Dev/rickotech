import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';
import Caixa from '~/pages/Caixa';
import Venda from '~/pages/Venda';
import Dashboard from '~/pages/Dashboard';
import ListProduct from '~/pages/ListProduct';
import RegistrationProduct from '~/pages/RegistrationProduct';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />

      <Route isPrivate path="/perfil" exact component={Profile} />
      <Route isPrivate path="/caixa" exact component={Caixa} />
      <Route isPrivate path="/venda" exact component={Venda} />
      <Route isPrivate path="/dashboard/inicio" exact component={Dashboard} />
      <Route isPrivate path="/list" exact component={ListProduct} />
      <Route isPrivate path="/product" exact component={RegistrationProduct} />
      <Route
        exact
        isPrivate
        path="/product/:id"
        render={(props) => <RegistrationProduct {...props} />}
      />
      <Route
      exact
      isPrivate
      path="/venda/:id"/>
    </Switch>
  );
}

export default Routes;
