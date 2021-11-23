import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';
import Adress from '~/pages/Profile/Adress';
import Caixa from '~/pages/Caixa';
import Sales from '~/pages/Sales';
import Dashboard from '~/pages/Dashboard';
import ListTodasAccounts from '~/pages/ListTodasAccounts';
import ListPaidAccounts from '~/pages/ListPaidAccounts';
import ListPendingAccounts from '~/pages/ListPendingAccounts';
import ListCancelAccounts from '~/pages/ListCancelAccounts';
import ListLateAccounts from '~/pages/ListLateAccounts';
import RegistrationProduct from '~/pages/RegistrationProduct'
import RegistrationAccount from '~/pages/RegistrationAccounts'
import RegistrationServices from '~/pages/RegistreServices'
import RegistrationPortion from '~/pages/RegistrationAccounts/RegistrationPortion'
import ListProduct from '~/pages/ListProduct';

function RoutesApp() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />
      <Route isPrivate path="/perfil/:id" exact component={Profile} />
      <Route isPrivate path="/adress/:id" exact component={Adress} />
      <Route isPrivate path="/caixa" exact component={Caixa} />
      <Route isPrivate path="/sales" exact component={Sales} />
      <Route isPrivate path="/dashboard" exact component={Dashboard} />
      <Route isPrivate path="/registreAccount" exact component={RegistrationAccount} />
      <Route isPrivate path="/registreProduct" exact component={RegistrationProduct} />
      <Route isPrivate path="/registreServices" exact component={RegistrationServices} />
      <Route isPrivate path="/registrePortion/:id" exact component={RegistrationPortion} />
      <Route isPrivate path="/listTodasAccounts" exact component={ListTodasAccounts} />
      <Route isPrivate path="/listPaidAccounts" exact component={ListPaidAccounts} />
      <Route isPrivate path="/listPendingAccouts" exact component={ListPendingAccounts} />
      <Route isPrivate path="/listaCancelAccounts" exact component={ListCancelAccounts} />
      <Route isPrivate path="/listaLateAccounts" exact component={ListLateAccounts} />
      <Route isPrivate path="/listProducts" exact component={ListProduct} />
      <Route isPrivate path="/product/:id" exact component={RegistrationProduct} />
      <Route isPrivate path="/account/:id" exact component={RegistrationAccount} />
      <Route isPrivate path="/portion/:id" exact component={RegistrationPortion} />
      <Route isPrivate path="/sales/:id" exact component={Sales}/>
    </Switch>
  );
}

export default RoutesApp;
