import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import product from './product/reducer';
import venda from './venda/reducer';

export default combineReducers({ auth, user, product, venda });
