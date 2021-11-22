export function createAccountRequest(values) {
  return {
    type: '@account/CREATE_ACCOUNT_REQUEST',
    payload: { values },
  };
}

export function getByIdAccountRequest(data) {
  return {
    type: '@account/GET_BYID_ACCOUNT_REQUEST',
    payload: { data },
  };
}

export function getByIdAccountSuccess(data) {
  return {
    type: '@account/GET_BYID_ACCOUNT_SUCCESS',
    payload: { data },
  };
}

export function findAllAccountRequest(data) {
  return {
    type: '@account/FIND_ALL_ACCOUNT_REQUEST',
    payload: { data },
  };
}

export function findAllAccountSuccess(data) {
  return {
    type: '@account/FIND_ALL_ACCOUNT_SUCCESS',
    payload: { data },
  };
}

export function findAllPaidAccountRequest(data) {
  return {
    type: '@account/FIND_ALL_PAID_ACCOUNT_REQUEST',
    payload: { data },
  };
}

export function findAllPaidAccountSuccess(data) {
  return {
    type: '@account/FIND_ALL_PAID_ACCOUNT_SUCCESS',
    payload: { data },
  };
}

export function findAllPendingAccountRequest(data) {
  return {
    type: '@account/FIND_ALL_PENDING_ACCOUNT_REQUEST',
    payload: { data },
  };
}

export function findAllPendingAccountSuccess(data) {
  return {
    type: '@account/FIND_ALL_PENDING_ACCOUNT_SUCCESS',
    payload: { data },
  };
}

export function findAllLateAccountRequest(data) {
  return {
    type: '@account/FIND_ALL_LATE_ACCOUNT_REQUEST',
    payload: { data },
  };
}

export function findAllLateAccountSuccess(data) {
  return {
    type: '@account/FIND_ALL_LATE_ACCOUNT_SUCCESS',
    payload: { data },
  };
}

export function findAllCancelAccountRequest(data) {
  return {
    type: '@account/FIND_ALL_CANCEL_ACCOUNT_REQUEST',
    payload: { data },
  };
}

export function findAllCancelAccountSuccess(data) {
  return {
    type: '@account/FIND_ALL_CANCEL_ACCOUNT_SUCCESS',
    payload: { data },
  };
}

export function UpdateCaixaRequest(data) {
  return {
    type: '@caixa/UPDATE_CAIXA_REQUEST',
    payload: { data },
  };
}

export function UpdateCaixaSuccess(data) {
  return {
    type: '@caixa/UPDATE_CAIXA_SUCCESS',
    payload: { data },
  };
}

export function caixaFailure() {
  return {
    type: '@caixa/CAIXA_FAILURE',
  };
}

export function resetFormulario() {
  return {
    type: '@caixa/RESET_FORM',
  };
}
