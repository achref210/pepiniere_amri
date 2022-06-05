import * as api from "../api";
import * as actionTypes from "../constants/actionTypes";

export const initialiseProducts = (data) => (dispatch) => {
  try {
    console.log(data)
      dispatch({ type: actionTypes.INITIALIZE,payload:data});
    } catch (error) {
      console.log(error.message);
    }
}

export const addCartItem = (data) => (dispatch) => {
    try {
      console.log("two")
        dispatch({ type: actionTypes.ADD_TO_CART, payload : {id:data._id, age:data.age, selectedQuantity:data.selectedQuantity, maxQuantity:data.quantity, price:data.price}});
      } catch (error) {
        console.log(error.message);
      }
}

export const duplicateCartItem = (itemID,itemGrowth,itemLength) => (dispatch) => {
  try {
    console.log("three")
      console.log(itemID,itemGrowth,itemLength)
      dispatch({ type: actionTypes.Duplicate_TO_CART, payload : {id:itemID,growth:itemGrowth,length:itemLength}});
    } catch (error) {
      console.log(error.message);
    }
}

export const removeCartItems = (itemID) => (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_FROM_CART, payload : {id:itemID}});
    } catch (error) {
      console.log(error.message);
    }
}

export const emptyCart = () => (dispatch) => {
  try {
    dispatch({ type: actionTypes.EMPTY_CART});
    } catch (error) {
      console.log(error.message);
    }
}

export const adjustQuantity = (itemID,growth,quantity) => (dispatch,navigate) => {
  try {console.log(itemID,growth,quantity)
    dispatch({ type: actionTypes.ADJUST_QTY, payload : {id:itemID,growth,quantity}});
    } catch (error) {
      console.log(error.message);
    }
}

export const adjustLength = (itemID,growth,length,price) => (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADJUST_LEN, payload : {id:itemID,growth,length,price}});
    } catch (error) {
      console.log(error.message);
    }
}

export const loadCurrentItem = (item) => (dispatch,navigate) => {
  try {
    dispatch({ type: actionTypes.LOAD_CURRENT_ITEM, payload : item});
    } catch (error) {
      console.log(error.message);
    }
}
