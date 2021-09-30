import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  vendaFailure,
  findAllVendaSuccess,
  getByIdVendaSuccess,
} from './actions';

export function* createVenda({ payload }) {
  try {
    yield call(api.post, 'venda/nova', payload);

    toast.success('Venda realizada com sucesso.');
  } catch (err) {
    yield put(vendaFailure());
    toast.error('Error na venda.');
  }
}

export function* findAllVenda({ payload }) {
  try {
    const response = yield call(api.get, `/vendas`);

    yield put(findAllVendaSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar vendas.');
    yield put(vendaFailure());
  }
}

export function* getByIdVenda({ payload }) {
  try {
    const response = yield call(api.get, `/venda/${payload.data}`);

    yield put(getByIdVendaSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscar venda.');
    yield put(vendaFailure());
  }
}

export function* UpdateVenda({ payload }) {
  try {
    yield call(api.put, `/venda/${payload.data.id}`, payload.data.values);

    const response = yield call(api.get, `/vendas`);

    yield put(findAllVendaSuccess(response.data));

    toast.success('Editado com sucesso.');
    history.push('/list');
  } catch (err) {
    toast.error('Error no editar venda.');
    yield put(vendaFailure());
  }
}

export function* deleteVenda({ payload }) {
  try {
    yield call(api.delete, `/venda/${payload.data}`);

    const response = yield call(api.get, `/vendas`);

    yield put(findAllVendaSuccess(response.data));

    toast.success('Venda deletada');
  } catch (err) {
    toast.error('Erro em excluir venda');
    yield put(vendaFailure());
  }
}

export default all([
  takeLatest('@venda/CREATE_VENDA_REQUEST', createVenda),
  takeLatest('@venda/FINDALL_VENDA_REQUEST', findAllVenda),
  takeLatest('@venda/GET_BYID_VENDA_REQUEST', getByIdVenda),
  takeLatest('@venda/UPDATE_VENDA_REQUEST', UpdateVenda),
  takeLatest('@venda/DELETE_VENDA_REQUEST', deleteVenda),
]);
