import { combineReducers } from "redux";
import saplings from "./saplings";
import seeds from "./seeds";
import materials from "./materials";
import employers from "./employers";
import auth from "./auth";
import plans from "./plans";
import suppliers from "./suppliers";
import products from "./products";
import cart from "./cart"
import users from "./users"
import requests from "./requests"
import geo from "./geo"
import ingineerRequests from "./ingineerRequests";

export default combineReducers({
  ingineerRequests,
  geo,
  saplings,
  seeds,
  materials,
  employers,
  auth,
  plans,
  suppliers,
  products,
  cart,
  users,
  requests
});
