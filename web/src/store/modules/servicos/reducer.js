import produce from 'immer';

const INITIAL_STATE = {
  servicoList: [],
  form: {
    id: undefined,
    name: '',
    valor: '',
    data_serviço: ''
  },
};

export default function service(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@service/RESET_FORM': {
        draft.form = {
          id: undefined,
          name: '',
          valor: '',
          data_serviço: ''
        }
        break;
      }
      case '@service/GET_BYID_SERVICE_FINANCIALBOX_VALORTOTAL_SUCCESS': {
        draft.servicoList = action.payload.data;
        break;
      }
      case '@service/GET_BYID_SERVICE_SUCCESS': {
        draft.servicoList = action.payload.data;
        break;
      }
      default:
    }
  });
}
