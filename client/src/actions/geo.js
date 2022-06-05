import * as api from "../api";
import * as actionTypes from "../constants/actionTypes";

//Action Creators
export const getGeo = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.fetchGeo();
    dispatch({ type: "FETCH_GEOS", payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createGeo = (geo) => async (dispatch) => {
  try {
    console.log(geo)
    const { data } = await api.createGeo(geo);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteGeo = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    await api.deleteGeo(id);

    dispatch({ type: "DELETE_GEO", payload: id });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

/*export const updateGeo = (id, plan) => async (dispatch) => {
  try {
    const { data } = await api.updatePlan(id, plan);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteGeo = (id) => async (dispatch) => {
  try {
    await api.deletePlan(id);

    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};*/