import { createStore, combineReducers } from "redux";
import {persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import reducerUser from "../reducers/reducerUser";
import reducerInstitution from "../reducers/reducerInstitution";
import reducerMessage from "../reducers/reducerMessage";
import reducerLogin from "../reducers/index"

const reducer = combineReducers({
  reducerUser,
  reducerInstitution,
  reducerMessage,
  login: reducerLogin,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  //Nombrar los demas reducers para agregarlos al storage 
  whitelist: ['login']

 };

 const pReducer = persistReducer(persistConfig, reducer);
 export const store = createStore(pReducer);  
 export const persistor = persistStore(store)



