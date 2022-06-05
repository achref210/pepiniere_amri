import { combineReducers } from "redux";
import saplings from "./saplings";
import seeds from "./seeds";
import employers from "./employers";
import auth from "./auth";
import plans from "./plans";

export default combineReducers({
  //posts:posts,
  saplings,
  seeds,
  employers,
  auth,
  plans,
});
