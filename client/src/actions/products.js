import * as api from "../api";
import * as actionTypes from "../constants/actionTypes";

export const refreshProducts = () => async (dispatch) => {
  try {
      await api.refreshProducts();
    } catch (error) {
      console.log(error.message);
    }
}

export const getFruits = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.START_LOADING });
        const { data } = await api.fetchFruits();
        await dispatch({ type: "FETCH_FRUITS", payload: data });
        dispatch({type:actionTypes.INITIALIZE, payload: data })
        dispatch({ type: actionTypes.END_LOADING });
      } catch (error) {
        console.log(error.message);
      }
}

export const addComment = (id, comment) => async (dispatch) => {
  try {
    console.log(id,comment)
    const { data } = await api.addComment(id,comment);
    await dispatch({type: actionTypes.ADD_COMM, payload:data})
  } catch (error) {
    console.log(error.message);
  }
}

export const getCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.fetchCategory(category);
    await dispatch({ type: "FETCH_CATEGORY", payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};