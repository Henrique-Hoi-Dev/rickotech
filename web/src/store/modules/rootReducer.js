import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import adress from './adress/reducer';
import product from './product/reducer';
import sales from './sales/reducer';
import account from './account/reducer';

export default combineReducers({ auth, user, adress, product, sales, account });
