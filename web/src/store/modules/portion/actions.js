export function createPortionRequest(values, id) {
  return {
    type: '@portion/CREATE_PORTION_REQUEST',
    payload: { values, id },
  };
}

export function getByIdPortionRequest(data) {
  return {
    type: '@portion/GET_BYID_PORTION_REQUEST',
    payload: { data },
  };
}

export function getByIdPortionSuccess(data) {
  return {
    type: '@portion/GET_BYID_PORTION_SUCCESS',
    payload: { data },
  };
}

export function UpdatePortionRequest(data) {
  return {
    type: '@portion/UPDATE_PORTION_REQUEST',
    payload: { data },
  };
}

export function UpdatePortionSuccess(data) {
  return {
    type: '@portion/UPDATE_PORTION_SUCCESS',
    payload: { data },
  };
}

export function deletePortionRequest(data) {
  return {
    type: '@portion/DELETE_PORTION_REQUEST',
    payload: { data },
  };
}

export function portionFailure() {
  return {
    type: '@portion/PORTION_FAILURE',
  };
}

export function resetFormulario() {
  return {
    type: '@portion/RESET_FORM',
  };
}
