//SJSU CMPE 138 Spring2020 TEAM7
import { combineReducers } from "redux";

import AppReducer from "./appReducer";
import AuthReducer from "./authReducer";

const reducers = combineReducers({
  app: AppReducer,
  auth: AuthReducer
});

export default reducers;
