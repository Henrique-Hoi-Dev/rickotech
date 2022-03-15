export function createSalesRequest(values, product_id) {
  return {
    type: '@sales/CREATE_SALES_REQUEST',
    payload: { values, product_id },
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

export function deleteSalesRequest(id) {
  return {
    type: '@sales/DELETE_SALES_REQUEST',
    payload: { id },
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
