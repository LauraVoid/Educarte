import {type as loginUserType} from '../actions/auth'


const defaultState = {
    institutionId:0,
    id:0,
    email:"",
    roleId:0,
    name:"",
    lastname:""
};
function newState(state, loginInfo) {
    return {
      ...state,
      loginInfo
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