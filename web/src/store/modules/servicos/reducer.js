import produce from 'immer';

const INITIAL_STATE = {
  servicoList: [],
  form: {
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
          name: '',
          valor: '',
          data_serviço: ''
        }
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
