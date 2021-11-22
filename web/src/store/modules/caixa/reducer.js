import produce from 'immer';

const INITIAL_STATE = {
  accountList: [],
  form: {
    id: undefined,
    name: '',
    data_vencimento: '',
    status: 'pendente',
  }
};

export default function account(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@account/RESET_FORM': {
        draft.form = {
          id: undefined,
          name: '',
          data_vencimento: '',
          status: 'pendente',
        };
        break;
      }
      case '@account/FIND_ALL_ACCOUNT_SUCCESS': {
        draft.accountList = action.payload.data;
        break;
      }
      case '@account/FIND_ALL_PAID_ACCOUNT_SUCCESS': {
        draft.accountList = action.payload.data;
        break;
      }
      case '@account/FIND_ALL_PENDING_ACCOUNT_SUCCESS': {
        draft.accountList = action.payload.data;
        break;
      }
      case '@account/FIND_ALL_CANCEL_ACCOUNT_SUCCESS': {
        draft.accountList = action.payload.data;
        break;
      }
      case '@account/FIND_ALL_LATE_ACCOUNT_SUCCESS': {
        draft.accountList = action.payload.data;
        break;
      }
      case '@account/GET_BYID_ACCOUNT_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      default:
    }
  });
}
