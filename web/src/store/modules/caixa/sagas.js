import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// import history from '~/services/history';
import api from '~/services/api2';

import {
  getByIdAccountSuccess,
  accountFailure
} from './actions';

export function* createCaixa({ payload }) {
  try {
    yield call(api.post, '/financialBox/new', payload.values);

    toast.success('Caixa salva com sucesso.');
  } catch (err) {
    yield put(accountFailure());
    toast.error('Error salvar conta.');
  }
}

export function* getByIdAccount({ payload }) {
  try {
    const response = yield call(api.get, `/account/${payload.data}`);

    yield put(getByIdAccountSuccess(response.data));
  } catch (err) {
    toast.error('Error no encontra conta.');
    yield put(accountFailure());
  }
}

export function* UpdateCaixa({ payload }) {
  try {
    yield call(api.put, `/account/${payload.data.account_id}`, payload.data.values);

    const response = yield call(api.get, `/accounts`);

    yield put(findAllAccountSuccess(response.data));
    toast.success('Editado com sucesso.');
  } catch (err) {
    toast.error('Error no editar conta.');
    yield put(accountFailure());
  }
}

export default all([
  takeLatest('@account/CREATE_ACCOUNT_REQUEST', createCaixa),
  takeLatest('@account/GET_BYID_ACCOUNT_REQUEST', getByIdAccount),
  takeLatest('@account/UPDATE_ACCOUNT_REQUEST', UpdateCaixa),
]);
