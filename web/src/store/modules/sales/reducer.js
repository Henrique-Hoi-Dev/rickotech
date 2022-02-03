import produce from 'immer';

const INITIAL_STATE = {
  salesList: [],
  form: {
    financial_id: undefined,
    product_id: undefined,
    name_product: '',
    valor_product: '',
    desconto: '',
    state: false,
    tipo_pagamento: 'AVISTA',
  },
};

export default function sales(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@sales/RESET_FORM': {
        draft.form = {
          financial_id: undefined,
          product_id: undefined,
          name_product: '',
          valor_product: '',
          desconto: '',
          state: false,
          tipo_pagamento: 'AVISTA',
        };
        break;
      }
      case '@sales/FIND_ALL_SALES_SUCCESS': {
        draft.salesList = action.payload.data;
        break;
      }
      case '@sales/GET_BYID_SALES_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      case '@sales/GET_BYID_SALES_FINANCIALBOX_VALORTOTAL_SUCCESS': {
        draft.salesList = action.payload.data;
        break;
      }
      default:
    }
  });
}
