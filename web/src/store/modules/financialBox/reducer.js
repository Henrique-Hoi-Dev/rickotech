import produce from 'immer';

const INITIAL_STATE = {
  financialBoxList: [],
  form: {
    valor_sales_total: '',
    valor_service_total: '',
    valor_total: '',
    open_caixa: '',
    close_caixa: '',
  }
};

export default function financialBox(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@financialBox/RESET_FORM': {
        draft.form = {
          valor_sales_total: '',
          valor_service_total: '',
          valor_total: '',
          open_caixa: '',
          close_caixa: '',
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
