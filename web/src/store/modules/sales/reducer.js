import produce from 'immer';

const INITIAL_STATE = {
  salesList: [],
  form: {
    name: '',
    valor: '',
    desconto: '0',
    tipo_pagamento: 'AVISTA',
    tipo_parcela: 'PAGO',
    parcela_valor: '0',
    parcela_numero: '0'
  },
};

export default function sales(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@sales/RESET_FORM': {
        draft.form = {
          name: '',
          valor: '',
          desconto: '0',
          tipo_pagamento: 'AVISTA',
          tipo_parcela: 'PAGO',
          parcela_valor: '0',
          parcela_numero: '0'
        };
        break;
      }
      case '@sales/FIND_ALL_SALES_SUCCESS': {
        draft.salesList = action.payload.data;
        break;
      }
      case '@sales/GET_BYID_SALES_SUCCESS': {
        draft.salesList = action.payload.data;
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
