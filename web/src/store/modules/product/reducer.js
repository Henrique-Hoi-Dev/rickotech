import produce from 'immer';

const INITIAL_STATE = {
  productList: [],
  form: {
    name: '',
    codigo_barra: '',
    valor: '',
    data_registro: ''
  },
};

export default function product(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@product/RESET_FORM': {
        draft.form = {
          name: '',
          codigo_barra: '',
          valor: '',
          descricao: '',
          data_registro: ''
        };
        break;
      }
      case '@product/FIND_ALL_PRODUCT_SUCCESS': {
        draft.productList = action.payload.data;
        break;
      }
      case '@product/GET_BYID_PRODUCT_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      default:
    }
  });
}
