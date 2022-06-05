import * as api from "../api";
import { END_LOADING, START_LOADING } from "../constants/actionTypes";

//Action Creators
export const getMaterials = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchMaterials();
    dispatch({ type: "FETCH_ALL_MATERIALS", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getMaterial = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchMaterial(id);
    dispatch({ type: "FETCH_MATERIAL", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getMaterialsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchMaterialsBySearch(searchQuery);
    dispatch({ type: "FETCH_MATERIALS_BY_SEARCH", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getMaterialsByFamily = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchMaterialsByFamily(searchQuery);
    dispatch({ type: "FETCH_MATERIALS_BY_Family", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRow = (id1, id2) => async (dispatch) => {
  try {
    const { data } = await api.deleteMaterialRow(id1, id2);
    dispatch({ type: "DELETE_ROW", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCol = (id1, id2, key, value) => async (dispatch) => {
  try {
    const { data } = await api.updateMaterialCol(id1, id2, key, value);
    dispatch({ type: "UPDATE_MATERIAL", payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const createRow = (id) => async (dispatch) => {
  try {
    const { data } = await api.createMaterialRow(id);
    await dispatch({ type: "CREATE_ROW", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createMaterial = (materialData,stockData) => async (dispatch) => {
  try {
    const material = {...materialData,stock:[stockData]};
    const { data } = await api.createMaterial(material);
    dispatch({ type: "CREATE_MATERIAL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateMaterial = (id, material) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateMaterial(id, material);
    dispatch({ type: "UPDATE_MATERIAL", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMaterial = (id) => async (dispatch) => {
  try {
    await api.deleteMaterials(id);

    dispatch({ type: "DELETE_MATERIAL", payload: id });
  } catch (error) {
    console.log(error);
  }
};