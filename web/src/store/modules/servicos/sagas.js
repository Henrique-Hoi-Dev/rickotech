import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { 
  serviceFailure, 
  getByIdServiceSuccess,
  findAllServiceSuccess } from './actions';
import history from '~/services/history';

export function* createService({ payload }) {
  try {
    const { name, price, date_service } = payload.values
    const servicos = { name, price, date_service }

    const financialId = payload.values.financial_id

    yield call(api.post, `/service/${financialId}`, servicos);

    toast.success('Serviço registrado com sucesso.');
    history.push('/')
  } catch (err) {
    toast.error('Error registro serviço.');
    yield put(serviceFailure());
  }
}

export function* getByIdService({ payload }) {
  try {
    const response = yield call(api.get, `/serviceFinancial/${payload.id}`);

    yield put(getByIdServiceSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar serviço.');
    yield put(serviceFailure());
  }
}

export function* findAllService() {
  try {
    const response = yield call(api.get, `/services`);

    yield put(findAllServiceSuccess(response.data));
  } catch (err) {
    toast.error('Erro em buscar serviço');
    yield put(serviceFailure());
  }
}

export function* deleteService({ payload }) {
  try {
    yield call(api.delete, `/service/${payload.id}`);

    const response = yield call(api.get, '/services');

    yield put(findAllServiceSuccess(response.data));
    toast.success('Serviço deletado');
  } catch (err) {
    toast.error('Erro em excluir serviços');
    yield put(serviceFailure());
  }
}

export default all([
  takeLatest('@service/CREATE_SERVICE_REQUEST', createService),
  takeLatest('@service/GET_BYID_SERVICE_REQUEST', getByIdService),
  takeLatest('@service/FINDALL_SERVICE_REQUEST', findAllService),
  takeLatest('@service/DELETE_SERVICE_REQUEST', deleteService),
]);
