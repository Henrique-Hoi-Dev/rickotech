export function createAdressRequest(values, id) {
  return {
    type: '@user/CREATE_ADRESS_REQUEST',
    payload: { values, id },
  };
}

export function getByIdUserRequest(data) {
  return {
    type: '@product/GET_BYID_USER_REQUEST',
    payload: { data },
  };
}

export function getByIdUserSuccess(data) {
  return {
    type: '@product/GET_BYID_USER_SUCCESS',
    payload: { data },
  };
}

export function updateAdressRequest(data, id) {
  return {
    type: '@user/UPDATE_ADRESS_REQUEST',
    payload: { data, id },
  };
}

export function updateAdressSuccess(data) {
  return {
    type: '@user/UPDATE_ADRESS_SUCCESS',
    payload: { data },
  };
}
export function updateProfileRequest(data, id) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data, id },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
  };
}

export function adressFailure() {
  return {
    type: '@user/ADRESS_FAILURE',
  };
}
