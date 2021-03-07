import { createStore, combineReducers } from "redux";
import reducerUser from "../reducers/reducerUser";

const reducer = combineReducers({
  reducerUser,
});

const store = createStore(reducer);

export default store;
