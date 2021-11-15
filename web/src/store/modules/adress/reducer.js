import produce from 'immer';

const INITIAL_STATE = {
  adresses: null,
};

export default function adress(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@adress/UPDATE_ADRESS_SUCCESS': {
        draft.adresses = action.payload.adresses;
        break;
      }
      default:
    }
  });
}
