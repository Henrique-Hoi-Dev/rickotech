import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api2';

import {
  findAllAccountSuccess,
  findAllPaidAccountSuccess,
  findAllPendingAccountSuccess,
  findAllCancelAccountSuccess,
  findAllLateAccountSuccess,
  getByIdAccountSuccess,
  accountFailure
} from './actions';

export function* createAccount({ payload }) {
  try {
    yield call(api.post, '/account/new', payload);

    toast.success('Conta salva com sucesso.');
  } catch (err) {
    yield put(accountFailure());
    toast.error('Error salvar conta.');
  }
}

export function* findAllAccount() {
  try {
    const response = yield call(api.get, '/accounts');

    yield put(findAllAccountSuccess(response.data));
  } catch (err) {
    toast.error('Error searching account check data.');
    yield put(accountFailure());
  }
}

export function* findAllAccountPaid() {
  try {
    const response = yield call(api.get, '/paidAccount');

    yield put(findAllPaidAccountSuccess(response.data));
  } catch (err) {
    toast.error('Error searching account check data.');
    yield put(accountFailure());
  }
}

export function* findAllAccountPending() {
  try {
    const response = yield call(api.get, '/pendingAccount');

    yield put(findAllPendingAccountSuccess(response.data));
  } catch (err) {
    toast.error('Error searching account check data.');
    yield put(accountFailure());
  }
}

export function* findAllAccountOverdue() {
  try {
    const response = yield call(api.get, '/overdues');

    yield put(findAllLateAccountSuccess(response.data));
  } catch (err) {
    toast.error('Error searching account check data.');
    yield put(accountFailure());
  }
}

export function* findAllAccountCancel() {
  try {
    const response = yield call(api.get, '/cancelAccount');

    yield put(findAllCancelAccountSuccess(response.data));
  } catch (err) {
    toast.error('Error searching account check data.');
    yield put(accountFailure());
  }
}

export function* getByIdAccount({ payload }) {
  try {
    const response = yield call(api.get, `/account/${payload.data}`);

    yield put(getByIdAccountSuccess(response.data));
  } catch (err) {
    toast.error('Error searching products check data.');
    yield put(accountFailure());
  }
}

export function* UpdateAccount({ payload }) {
  try {
    yield call(api.put, `/account/${payload.data.id}`, payload.data.values);

    const response = yield call(api.get, `/accounts`);

    yield put(findAllAccountSuccess(response.data));

    toast.success('Editado com sucesso.');
    history.push('/list');
  } catch (err) {
    toast.error('Error editing products checking data.');
    yield put(accountFailure());
  }
}

export function* deleteAccount({ payload }) {
  try {
    yield call(api.delete, `/account/${payload.data}`);

    const response = yield call(api.get, '/accounts');

    yield put(findAllAccountSuccess(response.data));

    toast.success('Produto deletado');
  } catch (err) {
    toast.error('Erro em excluir produto');
    yield put(accountFailure());
  }
}

export default all([
  takeLatest('@account/CREATE_ACCOUNT_REQUEST', createAccount),
  takeLatest('@account/FIND_ALL_ACCOUNT_REQUEST', findAllAccount),
  takeLatest('@account/FIND_ALL_PAID_ACCOUNT_REQUEST', findAllAccountPaid),
  takeLatest('@account/FIND_ALL_PENDING_ACCOUNT_REQUEST', findAllAccountPending),
  takeLatest('@account/FIND_ALL_LATE_ACCOUNT_REQUEST', findAllAccountOverdue),
  takeLatest('@account/FIND_ALL_CANCEL_ACCOUNT_REQUEST', findAllAccountCancel),
  takeLatest('@account/GET_BYID_ACCOUNT_REQUEST', getByIdAccount),
  takeLatest('@account/UPDATE_ACCOUNT_REQUEST', UpdateAccount),
  takeLatest('@account/DELETE_ACCOUNT_REQUEST', deleteAccount),
]);
