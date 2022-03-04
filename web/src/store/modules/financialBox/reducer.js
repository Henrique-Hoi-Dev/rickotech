import produce from 'immer';

const INITIAL_STATE = {
  financialBoxList: [],
  form: {
    open_caixa: '',
    close_caixa: '',
    value_total_sales: '',
    value_total_service: '',
    value_total: '',
    value_open: '',
  }
};

export default function financialBox(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@financialBox/RESET_FORM': {
        draft.form = {
          value_open: '',
          open_caixa: '',
        };
        break;
      }
      case '@financialBox/GET_BYID_FINANCIALBOX_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      case '@financialBox/FIND_ALL_FINANCIALBOX_SUCCESS': {
        draft.financialBoxList = action.payload.data;
        break;
      }
      default:
    }
  });
}
