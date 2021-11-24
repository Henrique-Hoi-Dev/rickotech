import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { 
  serviceFailure, 
  getByIdServiceFinancialBoxValorTotalSuccess, 
  getByIdServiceSuccess} from './actions';

export function* createService({ payload }) {
  try {
    yield call(api.post, `service/${payload.values.id}`, payload.values);

    toast.success('Serviço registrado com sucesso.');
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

// export function* deleteService({ payload }) {
//   try {
//     yield call(api.delete, `/venda/${payload.data}`);

//     // const response = yield call(api.get, `/vendas`);

//     // yield put(findAllVendaSuccess(response.data));

//     toast.success('Serviço deletada');
//   } catch (err) {
//     toast.error('Erro em excluir serviço');
//     yield put(serviceFailure());
//   }
// }

export default all([
  takeLatest('@service/CREATE_SERVICE_REQUEST', createService),
  takeLatest('@service/GET_BYID_SERVICE_FINANCIALBOX_VALORTOTAL_REQUEST', 
  getByIdServiceFinancialBoxValorTotal),
  takeLatest('@service/GET_BYID_SERVICE_REQUEST', getByIdService),
  // takeLatest('@service/DELETE_SERVICE_REQUEST', deleteService),
]);
