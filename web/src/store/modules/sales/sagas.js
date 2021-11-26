import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  salesFailure,
  findAllSalesSuccess,
  getByIdSalesSuccess,
  getByIdSalesFinancialBoxValorTotalSuccess } from './actions';

export function* createSales({ payload }) {
  try {
    yield call(api.post, `/sales/${payload.id}`, payload.values);

    toast.success('Venda realizada com sucesso.');
    history.push('/listProducts');
  } catch (err) {
    toast.error('Error na venda!');
    yield put(salesFailure());
  }
}

export function* findAllSales() {
  try {
    const response = yield call(api.get, '/saleses');

    yield put(findAllSalesSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar vendas.');
    yield put(salesFailure());
  }
}

export function* getByIdSalesFinancialBoxValorTotal({ payload }) {
  try {
    const response = yield call(api.get, `/salesFinancial/${payload.id}`);

    yield put(getByIdSalesFinancialBoxValorTotalSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar vendas.');
    yield put(salesFailure());
  }
}

export function* getByIdSales({ payload }) {
  try {
    const response = yield call(api.get, `/venda/${payload.data}`);

    yield put(getByIdSalesSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar venda.');
    yield put(salesFailure());
  }
}

export function* UpdateSales({ payload }) {
  try {
    yield call(api.put, `/venda/${payload.data.id}`, payload.data.values);

    const response = yield call(api.get, `/vendas`);

    yield put(findAllSalesSuccess(response.data));

    toast.success('Editado com sucesso.');
    history.push('/list');
  } catch (err) {
    toast.error('Error no editar venda.');
    yield put(salesFailure());
  }
}

export function* deleteSales({ payload }) {
  try {
    yield call(api.delete, `/sales/${payload.id}`);

    const response = yield call(api.get, '/saleses');

    yield put(findAllSalesSuccess(response.data));
    toast.success('Venda deletada');
  } catch (err) {
    toast.error('Erro em excluir venda');
    yield put(salesFailure());
  }
}

export default all([
  takeLatest('@sales/CREATE_SALES_REQUEST', createSales),
  takeLatest('@sales/FINDALL_SALES_REQUEST', findAllSales),
  takeLatest('@sales/GET_BYID_SALES_REQUEST', getByIdSales),
  takeLatest('@sales/GET_BYID_SALES_FINANCIALBOX_VALORTOTAL_REQUEST', 
  getByIdSalesFinancialBoxValorTotal),
  takeLatest('@sales/UPDATE_SALES_REQUEST', UpdateSales),
  takeLatest('@sales/DELETE_SALES_REQUEST', deleteSales),
]);
