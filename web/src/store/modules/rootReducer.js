import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import adress from './adress/reducer';
import product from './product/reducer';
import sales from './sales/reducer';
import account from './account/reducer';
import portion from './portion/reducer';
import servicos from './servicos/reducer';
import financialBox from './financialBox/reducer';

export default combineReducers({ 
  auth, 
  user, 
  adress, 
  product, 
  sales, 
  account, 
  portion, 
  servicos, 
  financialBox });
