import * as api from "../api";
import { END_LOADING, START_LOADING } from "../constants/actionTypes";

//Action Creators
export const getSaplings = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSaplings();
    console.log(data)
    dispatch({ type: "FETCH_ALL_SAPLINGS", payload: data });
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

    dispatch({ type: "FETCH_SAPLINGS_BY_SEARCH", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createSapling = (saplingData,stockData) => async (dispatch) => {
  try {
    const sapling = {...saplingData,stock:[stockData]};
    const { data } = await api.createSapling(sapling);
    dispatch({ type: "CREATE_SAPLING", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateSapling = (id, saplingData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateSapling(id, saplingData);
    await dispatch({ type: END_LOADING });
    dispatch({ type: "UPDATE_SAPLING", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSapling = (id) => async (dispatch) => {
  try {
    await api.deleteSaplings(id);

    dispatch({ type: "DELETE_SAPLING", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const createRow = (id) => async (dispatch) => {
  try {
    const { data } = await api.createRow(id);
    await dispatch({ type: "CREATE_ROW", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addFertilizationRow = (id1,id2) => async (dispatch) => {
  try {
    const { data } = await api.addFertilizationRow(id1,id2);
    await dispatch({ type: "CREATE_ROW", payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const setDefaultFertilizationPlan = (id1,id2) => async (dispatch) => {
  try {
    console.log(id1,id2)
    const { data } = await api.setDefaultFertilizationPlan(id1,id2);
    dispatch({ type: "CREATE_ROW", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFertilizationCol = (id1,id2,id3, key, value) => async (dispatch) => {
  try {
    console.log(id1,id2,id3)
    const { data } = await api.updateFertilizationCol(id1,id2,id3,key, value);
    await dispatch({ type: "UPDATE_FERTILIZATION_COL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFertilizationRow = (id1, id2,id3) => async (dispatch) => {
  try {
    const { data } = await api.deleteFertilizationRow(id1, id2,id3);
    
    dispatch({ type: "DELETE_ROW", payload: data });
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
    dispatch({ type: "UPDATE_COL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getDefaultFertilizationPlan = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchDefaultFertilizationPlan();
    console.log("d",data)
    dispatch({ type: "GET_DEFAULT_FERTILIZATION_PLAN", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createDefaultFertilizationProduct = () => async (dispatch) => {
  try {
    const { data } = await api.createDefaultFertilizationProduct();
    dispatch({ type: "CREATE_DEFAULT_FERTILIZATION_PRODUCT", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteDefaultFertilizationProduct = (id) => async (dispatch) => {
  try {
    await api.deleteDefaultFertilizationProduct(id);
    dispatch({ type: "DELETE_DEFAULT_FERTILIZATION_PRODUCT",payload: id});
    console.log('donne!')
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateDefaultFertilizationPlan = (id,info) => async (dispatch) => {
  try {
    const { data } = await api.updateDefaultFertilizationPlan(id,info);
    dispatch({ type: "UPDATE_DEFAULT_FERTILIZATION_PLAN", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};