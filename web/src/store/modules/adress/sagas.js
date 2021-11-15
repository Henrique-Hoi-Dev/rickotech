import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { adressFailure, updateAdressSuccess } from './actions';

export function* createAdress({ payload }) {
  try {
    const response = yield call(api.post, `/adress/${payload.id}`, payload.values);

    toast.success('Endereço salvo com sucesso.');
    yield put(updateAdressSuccess(response.data));
  } catch (err) {
    yield put(adressFailure());
    toast.error('Error em salvar endereço.');
  }
}

export function* updateAdress({ payload }) {
  try {
    const { 
      cep, 
      logradouro, 
      complemento, 
      numero, 
      bairro, 
      cidade, 
      uf } = payload.data;

    const adresses = { cep, logradouro, complemento, numero, bairro, cidade, uf };

    const response = yield call(api.put, `/adress/${payload.id}`, adresses);
    
    toast.success('Endereço atualizado com sucesso!');
    yield put(updateAdressSuccess(response.data));
  } catch (err) {
    toast.error('Error atualizado endereço.');
    yield put(adressFailure());
  }
}

export default all([
  takeLatest('@adress/CREATE_ADRESS_REQUEST', createAdress),
  takeLatest('@adress/UPDATE_ADRESS_REQUEST', updateAdress),
]);
