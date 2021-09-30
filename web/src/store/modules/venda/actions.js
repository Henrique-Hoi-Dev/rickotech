export function createVendatRequest(values) {
  return {
    type: '@venda/CREATE_VENDA_REQUEST',
    payload: { values },
  };
}

export function getByIdVendaRequest(data) {
  return {
    type: '@venda/GET_BYID_VENDA_REQUEST',
    payload: { data },
  };
}

export function getByIdVendaSuccess(data) {
  return {
    type: '@venda/GET_BYID_VENDA_SUCCESS',
    payload: { data },
  };
}

export function findAllVendaRequest(data) {
  return {
    type: '@venda/FINDALL_VENDA_REQUEST',
    payload: { data },
  };
}

export function findAllVendaSuccess(data) {
  return {
    type: '@venda/FIND_ALL_VENDA_SUCCESS',
    payload: { data },
  };
}

export function UpdateVendaRequest(data) {
  return {
    type: '@venda/UPDATE_VENDA_REQUEST',
    payload: { data },
  };
}

export function UpdateVendaSuccess(data) {
  return {
    type: '@venda/UPDATE_VENDA_SUCCESS',
    payload: { data },
  };
}

export function deleteVendaRequest(data) {
  return {
    type: '@venda/DELETE_VENDA_REQUEST',
    payload: { data },
  };
}

export function vendaFailure() {
  return {
    type: '@venda/VENDA_FAILURE',
  };
}

export function resetFormulario() {
  return {
    type: '@product/RESET_FORM',
  };
}
