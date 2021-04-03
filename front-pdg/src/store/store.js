import { createStore, combineReducers } from "redux";
import reducerUser from "../reducers/reducerUser";
import reducerInstitution from "../reducers/reducerInstitution";
import reducerMessage from "../reducers/reducerMessage";

const reducer = combineReducers({
  reducerUser,
  reducerInstitution,
  reducerMessage,
});

const store = createStore(reducer);

export default store;
