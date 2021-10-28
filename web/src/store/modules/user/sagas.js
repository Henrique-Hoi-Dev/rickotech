import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateProfileSuccess, updateAdressSuccess, getByIdUserSuccess, adressFailure } from './actions';

export function* createAdress({ payload }) {
  const {
    cep,
    logradouro,
    complemento,
    numero,
    bairro,
    cidade,
    uf
  } = payload.values;
  const adress = {
    cep,
    logradouro,
    complemento,
    numero,
    bairro,
    cidade,
    uf
  };
  try {
    yield call(api.post, `/adress/${payload.id}`, adress);

    toast.success('Endereço salvo com sucesso.');
  } catch (err) {
    yield put(adressFailure());
    toast.error('Error em salvar endereço.');
  }
}

export function* getByIdUser({ payload }) {
  try {
    const response = yield call(api.get, `/user/${payload.id}`);

    yield put(getByIdUserSuccess(response.data));
  } catch (err) {
    toast.error('Error searching user check data.');
    yield put(adressFailure());
  }
}

export function* updateAdress({ payload }) {
  try {
    const response = yield call(api.put, `/adress/${payload.id}`, payload.data);

    yield put(updateAdressSuccess(response.data));

    toast.success('Endereço atualizado com sucesso!');
  } catch (err) {
    toast.error('Error atualizado endereço.');
    yield put(adressFailure());
  }
}

export function* updateProfile({ payload }) {
  try {
    const {
      name,
      email,
      avatar_id,
      cargo,
      cpf,
      data_nascimento,
      ...rest
    } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      cargo,
      cpf,
      data_nascimento,
      ...(rest.oldPassword ? rest : {}),
    };
    const response = yield call(api.put, `/user/${payload.id}`, profile);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!');
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/UPDATE_ADRESS_REQUEST', updateAdress),
  takeLatest('@user/CREATE_ADRESS_REQUEST', createAdress)
]);
