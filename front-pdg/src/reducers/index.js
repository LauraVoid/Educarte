import { type as loginUserType } from "../actions/auth";
import { type as logOut} from "../actions/singOut"

const defaultState = {};
function newState(state, loginInfo) {
  state = loginInfo;

  return {
    ...state,
  };
}

function logOuState(state) {
  state = { }  
  return {
    ...state,
  };
}

function loginUser(state = defaultState, { type, payload }) {
  switch (type) {
    case loginUserType: {
      return newState(state, payload);
    }
    case logOut:{
      return logOuState(state);
    }
    default:
      return state;
  }
}

export default loginUser;
