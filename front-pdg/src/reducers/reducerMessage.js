import { MESSAGE } from "../actions/constants";

const INITIAL_STATE = {
  errorMsg: "",
  errorType: "",
};

function newState(state, errorMsg, errorType) {
  return { ...state, errorMsg, errorType };
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MESSAGE: {
      return newState(state, action.text.errorMsg, action.text.errorType);
    }
    default:
      return INITIAL_STATE;
  }
}
