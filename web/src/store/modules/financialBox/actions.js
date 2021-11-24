export function createFinancialBoxRequest(values, id) {
  return {
    type: '@financialBox/CREATE_FINANCIALBOX_REQUEST',
    payload: { values, id },
  };
}

export function getByIdFinancialBoxRequest(id) {
  return {
    type: '@financialBox/GET_BYID_FINANCIALBOX_REQUEST',
    payload: { id },
  };
}

export function getByIdFinancialBoxSuccess(data) {
  return {
    type: '@financialBox/GET_BYID_FINANCIALBOX_SUCCESS',
    payload: { data },
  };
}

export function findAllFinancialBoxRequest() {
  return {
    type: '@financialBox/FIND_ALL_FINANCIALBOX_REQUEST',
    payload: { },
  };
}

export function findAllFinancialBoxSuccess(data) {
  return {
    type: '@financialBox/FIND_ALL_FINANCIALBOX_SUCCESS',
    payload: { data },
  };
}

export function UpdateFinancialBoxRequest(data) {
  return {
    type: '@financialBox/UPDATE_FINANCIALBOX_REQUEST',
    payload: { data },
  };
}

export function UpdateFinancialBoxSuccess(data) {
  return {
    type: '@financialBox/UPDATE_FINANCIALBOX_SUCCESS',
    payload: { data },
  };
}

export function deleteFinancialBoxRequest(id) {
  return {
    type: '@financialBox/DELETE_FINANCIALBOX_REQUEST',
    payload: { id },
  };
}

export function financialBoxFailure() {
  return {
    type: '@financialBox/FINANCIALBOX_FAILURE',
  };
}

export function resetFormulario() {
  return {
    type: '@financialBox/RESET_FORM',
  };
}
