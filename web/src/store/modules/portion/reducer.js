import produce from 'immer';

const INITIAL_STATE = {
  form: {
    id: undefined,
    valor: '',
    numero_parcela: '',
    data_vencimento: '',
    pago: 'false',
  }
};

export default function portion(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@portion/RESET_FORM': {
        draft.form = {
          id: undefined,
          valor: '',
          numero_parcela: '',
          data_vencimento: '',
          pago: 'false',
        };
        break;
      }
      case '@portion/GET_BYID_PORTION_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      default:
    }
  });
}
