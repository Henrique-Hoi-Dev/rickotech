import produce from 'immer';

const INITIAL_STATE = {
  vendaList: [],
  form: null,
};

export default function venda(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@venda/RESET_FORM': {
        draft.form = null;
        break;
      }
      case '@venda/CREATE_VENDA_SUCCESS': {
        draft.vendaList = action.payload.data;
        break;
      }
      case '@venda/FIND_ALL_VENDA_SUCCESS': {
        draft.vendaList = action.payload.data;
        break;
      }
      case '@venda/GET_BYID_VENDA_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      default:
    }
  });
}
