import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import product from './product/sagas';
import sales from './sales/sagas';
import account from './account/sagas';

export default function* rootSaga() {
  return yield all([auth, user, product, sales, account]);
}
