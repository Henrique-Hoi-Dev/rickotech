export function createSalesRequest(values, id) {
  return {
    type: '@sales/CREATE_SALES_REQUEST',
    payload: { values, id },
  };
}

export function getByIdSalesRequest(id) {
  return {
    type: '@sales/GET_BYID_SALES_REQUEST',
    payload: { id },
  };
}

export function getByIdSalesSuccess(data) {
  return {
    type: '@sales/GET_BYID_SALES_SUCCESS',
    payload: { data },
  };
}

export function getByIdSalesFinancialBoxValorTotalRequest(id) {
  return {
    type: '@sales/GET_BYID_SALES_FINANCIALBOX_VALORTOTAL_REQUEST',
    payload: { id },
  };
}

export function getByIdSalesFinancialBoxValorTotalSuccess(data) {
  return {
    type: '@sales/GET_BYID_SALES_FINANCIALBOX_VALORTOTAL_SUCCESS',
    payload: { data },
  };
}

export function findAllSalesRequest() {
  return {
    type: '@sales/FINDALL_SALES_REQUEST',
    payload: { },
  };
}

export function findAllSalesSuccess(data) {
  return {
    type: '@sales/FIND_ALL_SALES_SUCCESS',
    payload: { data },
  };
}

export function UpdateSalesRequest(data) {
  return {
    type: '@sales/UPDATE_SALES_REQUEST',
    payload: { data },
  };
}

export function UpdateSalesSuccess(data) {
  return {
    type: '@sales/UPDATE_SALES_SUCCESS',
    payload: { data },
  };
}

export function deleteSalesRequest(data) {
  return {
    type: '@sales/DELETE_SALES_REQUEST',
    payload: { data },
  };
}

export function salesFailure() {
  return {
    type: '@sales/SALES_FAILURE',
  };
}

export function resetFormulario() {
  return {
    type: '@product/RESET_FORM',
  };
}
