import produce from 'immer';

const INITIAL_STATE = {
  servicoList: [],
  form: {
    financial_id: undefined,
    name: '',
    price: '',
    date_service: ''
  },
};

export default function service(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@service/RESET_FORM': {
        draft.form = {
          financial_id: undefined,
          name: '',
          price: '',
          date_service: ''
        }
        break;
      }
      case '@service/GET_BYID_SERVICE_SUCCESS': {
        draft.servicoList = action.payload.data;
        break;
      }
      case '@service/FIND_ALL_SERVICE_SUCCESS': {
        draft.servicoList = action.payload.data;
        break;
      }
      default:
    }
  });
}
