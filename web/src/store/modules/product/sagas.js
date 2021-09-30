import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  productFailure,
  findAllProductSuccess,
  getByIdProductSuccess,
} from './actions';

export function* createProduct({ payload }) {
  try {
    yield call(api.post, 'products/new', payload);

    toast.success('Produto salvo com sucesso.');
  } catch (err) {
    yield put(productFailure());
    toast.error('Error saving product.');
  }
}

export function* findAllProduct({ payload }) {
  try {
    const response = yield call(api.get, `/products`);

    yield put(findAllProductSuccess(response.data));
  } catch (err) {
    toast.error('Error searching products check data.');
    yield put(productFailure());
  }
}

export function* getByIdProduct({ payload }) {
  try {
    const response = yield call(api.get, `/products/${payload.data}`);

    yield put(getByIdProductSuccess(response.data));
  } catch (err) {
    toast.error('Error searching products check data.');
    yield put(productFailure());
  }
}

export function* UpdateProduct({ payload }) {
  try {
    yield call(api.put, `/products/${payload.data.id}`, payload.data.values);

    const response = yield call(api.get, `/products`);

    yield put(findAllProductSuccess(response.data));

    toast.success('Editado com sucesso.');
    history.push('/list');
  } catch (err) {
    toast.error('Error editing products checking data.');
    yield put(productFailure());
  }
}

export function* deleteProduct({ payload }) {
  try {
    yield call(api.delete, `/products/${payload.data}`);

    const response = yield call(api.get, `/products`);

    yield put(findAllProductSuccess(response.data));

    toast.success('Produto deletado');
  } catch (err) {
    toast.error('Erro em excluir produto');
    yield put(productFailure());
  }
}

export default all([
  takeLatest('@product/CREATE_PRODUCT_REQUEST', createProduct),
  takeLatest('@product/FINDALL_PRODUCT_REQUEST', findAllProduct),
  takeLatest('@product/GET_BYID_PRODUCT_REQUEST', getByIdProduct),
  takeLatest('@product/UPDATE_PRODUCT_REQUEST', UpdateProduct),
  takeLatest('@product/DELETE_PRODUCT_REQUEST', deleteProduct),
]);
