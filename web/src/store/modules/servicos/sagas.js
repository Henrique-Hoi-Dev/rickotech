import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { 
  serviceFailure, 
  getByIdServiceFinancialBoxValorTotalSuccess, 
  getByIdServiceSuccess,
  findAllServiceSuccess } from './actions';
import history from '~/services/history';

export function* createService({ payload }) {
  try {
    const { name, valor, data_serviço } = payload.values
    const servicos = { name, valor, data_serviço }

    const financialId = payload.values.financial_id

    yield call(api.post, `service/${financialId}`, servicos);

    toast.success('Serviço registrado com sucesso.');
    history.push('/')
  } catch (err) {
    toast.error('Error registro serviço.');
    yield put(serviceFailure());
  }
}

export function* getByIdServiceFinancialBoxValorTotal({ payload }) {
  try {
    const response = yield call(api.get, `/serviceFinancial/${payload.id}`);

    yield put(getByIdServiceFinancialBoxValorTotalSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar serviço.');
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

export default all([
  takeLatest('@service/CREATE_SERVICE_REQUEST', createService),
  takeLatest('@service/GET_BYID_SERVICE_FINANCIALBOX_VALORTOTAL_REQUEST', getByIdServiceFinancialBoxValorTotal),
  takeLatest('@service/GET_BYID_SERVICE_REQUEST', getByIdService),
  takeLatest('@service/FINDALL_SERVICE_REQUEST', findAllService),
]);
