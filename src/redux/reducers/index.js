import { combineReducers } from "redux";
import car from "./car";
import auth from "./auth";
import rental from "./rental";
import detail from "./detail";

export default combineReducers({
  auth,
  car,
  rental,
  detail,
});
