import * as api from "../api";
import { END_LOADING, START_LOADING } from "../constants/actionTypes";

//Action Creators
export const getSaplings = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSaplings();
    dispatch({ type: "FETCH_ALL", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getSapling = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSapling(id);
    dispatch({ type: "FETCH_SAPLING", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getSaplingsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSaplingsBySearch(searchQuery);

    dispatch({ type: "FETCH_BY_SEARCH", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createSapling = (sapling) => async (dispatch) => {
  try {
    const { data } = await api.createSapling(sapling);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateSapling = (id, sapling) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateSapling(id, sapling);
    await dispatch({ type: END_LOADING });
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSapling = (id) => async (dispatch) => {
  try {
    await api.deleteSaplings(id);

    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const createRow = (id) => async (dispatch) => {
  try {
    const { data } = await api.createRow(id);
    console.log(data);
    await dispatch({ type: "CREATE_ROW", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRow = (id1, id2) => async (dispatch) => {
  try {
    console.log(id1, id2);
    const { data } = await api.deleteRow(id1, id2);
    console.log(data);
    dispatch({ type: "DELETE_ROW", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCol = (id1, id2, key, value) => async (dispatch) => {
  try {
    const { data } = await api.updateCol(id1, id2, key, value);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
