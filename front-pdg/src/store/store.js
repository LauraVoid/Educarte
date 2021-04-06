import { createStore, combineReducers } from "redux";
import reducerUser from "../reducers/reducerUser";
import reducerInstitution from "../reducers/reducerInstitution";
import reducerMessage from "../reducers/reducerMessage";
import reducerLogin from "../reducers/index"

const reducer = combineReducers({
  reducerUser,
  reducerInstitution,
  reducerMessage,
  reducerLogin,
});

const store = createStore(reducer);

export default store;
