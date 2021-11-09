import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';
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
import ListProduct from '~/pages/ListProduct';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />

      <Route isPrivate path="/perfil/:id" exact component={Profile} />
      <Route isPrivate path="/caixa" exact component={Caixa} />
      <Route isPrivate path="/sales" exact component={Sales} />
      <Route isPrivate path="/dashboard" exact component={Dashboard} />
      <Route isPrivate path="/registreAccount" exact component={RegistrationAccount} />
      <Route isPrivate path="/listTodasAccounts" exact component={ListTodasAccounts} />
      <Route isPrivate path="/listPaidAccounts" exact component={ListPaidAccounts} />
      <Route isPrivate path="/listPendingAccouts" exact component={ListPendingAccounts} />
      <Route isPrivate path="/listaCancelAccounts" exact component={ListCancelAccounts} />
      <Route isPrivate path="/listaLateAccounts" exact component={ListLateAccounts} />
      <Route isPrivate path="/registreProduct" exact component={RegistrationProduct} />
      <Route isPrivate path="/listProducts" exact component={ListProduct} />
      <Route isPrivate exact path="/registreProduct/:id"
        reder={(props) => <RegistrationProduct {...props} name="product"/>}
      />
      <Route isPrivate exact path="/account/:id"
        reder={(props) => <RegistrationAccount {...props} name="account"/>}
      />
      
      <Route exact isPrivate path="/venda/:id"/>
    </Switch>
  );
}

export default Routes;
