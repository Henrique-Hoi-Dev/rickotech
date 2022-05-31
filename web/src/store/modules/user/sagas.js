import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { updateProfileSuccess } from './actions';
import history from '../../../services/history';

export function* updateProfile({ payload }) {
  try {
    const { 
      name, 
      email, 
      avatar_id, 
      company_position, 
      cpf, 
      date_birth, 
      ...rest } = payload.data;

    const profile = { 
      name, 
      email, 
      avatar_id, 
      company_position,
      cpf, 
      date_birth, 
      ...(rest.oldPassword ? rest : {}),};
                      
    const response = yield call(api.put, `/user/${payload.id}`, profile);

    toast.success('Perfil atualizado com sucesso!');
    yield put(updateProfileSuccess(response.data));
    history.push('/')
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!');
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
]);
