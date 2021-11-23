import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// import history from '~/services/history';
import api from '~/services/api';

import {
  serviceFailure,
  getByIdServiceSuccess,
} from './actions';

export function* createService({ payload }) {
  try {
    yield call(api.post, 'venda/nova', payload);

    toast.success('Venda realizada com sucesso.');
  } catch (err) {
    toast.error('Error na venda.');
    yield put(serviceFailure());
  }
}

export function* getByIdService({ payload }) {
  try {
    const response = yield call(api.get, `/venda/${payload.data}`);

    yield put(getByIdServiceSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar venda.');
    yield put(serviceFailure());
  }
}

export function* deleteService({ payload }) {
  try {
    yield call(api.delete, `/venda/${payload.data}`);

    // const response = yield call(api.get, `/vendas`);

    // yield put(findAllVendaSuccess(response.data));

    toast.success('Venda deletada');
  } catch (err) {
    toast.error('Erro em excluir venda');
    yield put(serviceFailure());
  }
}

export default all([
  takeLatest('@service/CREATE_SERVICE_REQUEST', createService),
  takeLatest('@service/GET_BYID_SERVICE_REQUEST', getByIdService),
  takeLatest('@service/DELETE_SERVICE_REQUEST', deleteService),
]);
