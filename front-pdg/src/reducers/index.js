import {type as loginUserType} from '../actions/auth'


const defaultState = {

};
function newState(state, loginInfo) {
    state = loginInfo
    return {
      ...state,      
    };
  }
  

function loginUser(state = defaultState, { type, payload }) {
    switch (type) {
        case loginUserType: {            
                return newState(
                    state,
                    payload
                )       
                        
        }
        default:
            return state;
    }
}

export default loginUser;