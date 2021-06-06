import { type as filterContentType } from "../actions/actionContent";


const defaultState = {
    value:"no"
};
function newState(state, filter) {
  state.value= filter;

  return {
   ...state,
  };
}


function filterContent(state = defaultState, { type, payload }) {
  switch (type) {
    case filterContentType: {
      return newState(state, payload);
    }    
    default:
      return state;
  }
}

export default filterContent;
