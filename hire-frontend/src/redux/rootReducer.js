import modalReducer from "./modalSlice";
import signUpReducer from "./signUpDataSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  modal: modalReducer,
  signUpDetails: signUpReducer,
});

export default rootReducer;
