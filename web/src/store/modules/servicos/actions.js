export function createServicetRequest(values) {
  return {
    type: '@service/CREATE_SERVICE_REQUEST',
    payload: { values },
  };
}

export function getByIdServiceRequest(id) {
  return {
    type: '@service/GET_BYID_SERVICE_REQUEST',
    payload: { id },
  };
}

export function getByIdServiceSuccess(data) {
  return {
    type: '@service/GET_BYID_SERVICE_SUCCESS',
    payload: { data },
  };
}

export function getByIdServiceFinancialBoxValorTotalRequest(id) {
  return {
    type: '@service/GET_BYID_SERVICE_FINANCIALBOX_VALORTOTAL_REQUEST',
    payload: { id },
  };
}

export function getByIdServiceFinancialBoxValorTotalSuccess(data) {
  return {
    type: '@service/GET_BYID_SERVICE_FINANCIALBOX_VALORTOTAL_SUCCESS',
    payload: { data },
  };
}

export function deleteServiceRequest(data) {
  return {
    type: '@service/DELETE_SERVICE_REQUEST',
    payload: { data },
  };
}

export function serviceFailure() {
  return {
    type: '@service/SERVICE_FAILURE',
  };
}

export function resetFormulario() {
  return {
    type: '@service/RESET_FORM',
  };
}
