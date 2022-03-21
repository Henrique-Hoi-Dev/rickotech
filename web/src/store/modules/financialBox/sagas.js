import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  getByIdFinancialBoxSuccess,
  findAllFinancialBoxSuccess,
  getCardSuccess, 
  financialBoxFailure
} from './actions';

export function* createFinancialBox({ payload }) {
  try {
    const { open_caixa, value_open } = payload.values
    const financialBox = { open_caixa, value_open }

    const response = yield call(api.post, `/financialBox/${payload.id}`, financialBox);

    toast.success('Caixa aberto com sucesso.');
    history.push(`/caixaInfo/${response.data.responseData.id}`)
  } catch (err) {
    toast.error('Error no abrir o caixa.');
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

export function* getByCard() {
  try {
    const response = yield call(api.get, '/card');

    yield put(getCardSuccess(response.data));
  } catch (err) {
    toast.error('Error no encontrar cards.');
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
  try {
    const { close_caixa, status } = payload.data
    const fecharCaixa = { close_caixa, status }

    const response = yield call(api.put, `/financialBox/${payload.id}`, fecharCaixa);

    yield put(getByIdFinancialBoxSuccess(response.data));
    toast.success('Caixa fechado com sucesso.');
    history.push('/')
  } catch (err) {
    toast.error('Error no fechar caixa.');
    yield put(financialBoxFailure());
  }
}

export default all([
  takeLatest('@financialBox/CREATE_FINANCIALBOX_REQUEST', createFinancialBox),
  takeLatest('@financialBox/GET_BYID_FINANCIALBOX_REQUEST', getByIdFinancialBox),
  takeLatest('@financialBox/GET_CARD_REQUEST', getByCard),
  takeLatest('@financialBox/FIND_ALL_FINANCIALBOX_REQUEST', findAllFinancialBox),
  takeLatest('@financialBox/UPDATE_FINANCIALBOX_REQUEST', UpdateFinancialBox),
]);
