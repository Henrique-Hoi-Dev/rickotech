import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// import history from '~/services/history';
import api from '~/services/api';

import {
  getByIdFinancialBoxSuccess,
  UpdateFinancialBoxSuccess,
  findAllFinancialBoxSuccess, 
  financialBoxFailure
} from './actions';

export function* createFinancialBox({ payload }) {
  try {
    yield call(api.post, '/financialBox/new', payload.values);

    toast.success('Caixa salvo com sucesso.');
  } catch (err) {
    toast.error('Error salvar caixa.');
    yield put(financialBoxFailure());
  }
}

export function* getByIdFinancialBox({ payload }) {
  try {
    const response = yield call(api.get, `/financialBox/${payload.id}`);

    yield put(getByIdFinancialBoxSuccess(response.data));
  } catch (err) {
    toast.error('Error no encontrar caixa.');
    yield put(financialBoxFailure());
  }
}

export function* findAllFinancialBox() {
  try {
    const response = yield call(api.get, '/financialBoxs');

    yield put(findAllFinancialBoxSuccess(response.data));
  } catch (err) {
    toast.error('Error encontrar caixas.');
    yield put(financialBoxFailure());
  }
}

export function* UpdateFinancialBox({ payload }) {
  console.log(payload)
  try {
    const response = yield call(api.put, `/financialBox/${payload.data.id}`, payload.data.values);

    yield put(UpdateFinancialBoxSuccess(response.data));
    toast.success('Caixa editado com sucesso.');
  } catch (err) {
    toast.error('Error no editar caixa.');
    yield put(financialBoxFailure());
  }
}

export default all([
  takeLatest('@financialBox/CREATE_FINANCIALBOX_REQUEST', createFinancialBox),
  takeLatest('@financialBox/GET_BYID_FINANCIALBOX_REQUEST', getByIdFinancialBox),
  takeLatest('@financialBox/FIND_ALL_FINANCIALBOX_REQUEST', findAllFinancialBox),
  takeLatest('@financialBox/UPDATE_FINANCIALBOX_REQUEST', UpdateFinancialBox),
]);
