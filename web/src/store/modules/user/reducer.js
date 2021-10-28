import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  user: []
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@user/CREATE_ADRESS_SUCCESS': {
        draft.profile = action.payload.adress;
        break;
      }
      case '@product/GET_BYID_USER_SUCCESS': {
        draft.user = action.payload.data;
        break;
      }
      case '@user/UPDATE_ADRESS_SUCCESS': {
        draft.profile = action.payload.adress;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
