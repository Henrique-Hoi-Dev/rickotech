import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  productFailure,
  findAllProductSuccess,
  getByIdProductSuccess,
  resetFormularioProduct
} from './actions';

export function* createProduct({ payload }) {
  try {
    yield call(api.post, '/product', payload.values);

    toast.success('Produto criado com sucesso.');
    yield put(resetFormularioProduct());

    const response = yield call(api.get, `/products`);

    yield put(findAllProductSuccess(response.data));

  } catch (err) {
    yield put(productFailure());
    toast.error('Erro em salvar produto.');
  }
}

export function* findAllProduct() {
  try {
    const response = yield call(api.get, `/products`);

    yield put(findAllProductSuccess(response.data));
  } catch (err) {
    toast.error('Error em buscas produtos.');
    yield put(productFailure());
  }
}

export function* getByIdProduct({ payload }) {
  try {
    const response = yield call(api.get, `/product/${payload.id}`);

    yield put(getByIdProductSuccess(response.data));
  } catch (err) {
    toast.error('Error searching products check data.');
    yield put(productFailure());
  }
}

export function* UpdateProduct({ payload }) {
  try {
    yield call(api.put, `/product/${payload.data.product_id}`, payload.data.values);

    const response = yield call(api.get, `/products`);

    yield put(findAllProductSuccess(response.data));
    yield put(resetFormularioProduct());
    
    toast.success('Editado com sucesso.');
  } catch (err) {
    toast.error('Error editing products checking data.');
    yield put(productFailure());
  }
}

export function* deleteProduct({ payload }) {
  try {
    yield call(api.delete, `/product/${payload.data}`);

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
