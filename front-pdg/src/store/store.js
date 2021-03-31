import { createStore, combineReducers } from "redux";
import reducerUser from "../reducers/reducerUser";
import reducerInstitution from "../reducers/reducerInstitution"

const reducer = combineReducers({
  reducerUser,
  reducerInstitution,

});

const store = createStore(reducer);

export default store;
