import * as api from "../api";
import { END_LOADING, START_LOADING, START_LOADING_ARTICLES, END_LOADING_ARTICLES } from "../constants/actionTypes";

//Action Creators
export const getSuppliers = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSuppliers();
    dispatch({ type: "FETCH_SUPPLIERS", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getSupplier = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSupplier(id);
    await dispatch({ type: "FETCH_SUPPLIER", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};


export const getSuppliersBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSuppliersBySearch(searchQuery);

    await dispatch({ type: "FETCH_SUPPLIER_BY_SEARCH", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createSupplier = (supplier) => async (dispatch) => {
  try {
    const { data } = await api.createSupplier(supplier);
    await dispatch({ type: "CREATE_SUPPLIER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateSupplier = (id, employer) => async (dispatch) => {
  try {
    //dispatch({ type: START_LOADING_ARTICLES });
    const { data } = await api.updateSupplier(id, employer);
    await dispatch({ type: "UPDATE_SUPPLIER", payload: data });
    //dispatch({ type: END_LOADING_ARTICLES})
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSupplier = (id) => async (dispatch) => {
  try {
    await api.deleteSupplier(id);
    await dispatch({ type: "DELETE_SUPPLIER", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const createSaplingArticle = (id,newSaplingArticle) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ARTICLES });
    const { data } = await api.createSaplingArticle(id,newSaplingArticle);
    await dispatch({ type: "UPDATE_SUPPLIER", payload: data });
    dispatch({ type: END_LOADING_ARTICLES})
  } catch (error) {
    console.log(error);
  }
};

export const createSeedArticle = (id,newSeedArticle) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ARTICLES });
    const { data } = await api.createSeedArticle(id,newSeedArticle);
    await dispatch({ type: "UPDATE_SUPPLIER", payload: data });
    dispatch({ type: END_LOADING_ARTICLES})
  } catch (error) {
    console.log(error);
  }
};

export const createMaterialArticle = (id,newMaterialArticle) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ARTICLES });
    const { data } = await api.createMaterialArticle(id,newMaterialArticle);
    await dispatch({ type: "UPDATE_SUPPLIER", payload: data });
    dispatch({ type: END_LOADING_ARTICLES})
  } catch (error) {
    console.log(error);
  }
};

export const deleteSaplingArticle = (id1,id2) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ARTICLES });
    const { data } = await api.deleteSaplingArticle(id1,id2);
    await dispatch({ type: "UPDATE_SUPPLIER", payload: data });
    dispatch({ type: END_LOADING_ARTICLES})
  } catch (error) {
    console.log(error);
  }
};

export const deleteSeedArticle = (id1,id2) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ARTICLES });
    const { data } = await api.deleteSeedArticle(id1,id2);
    await dispatch({ type: "UPDATE_SUPPLIER", payload: data });
    dispatch({ type: END_LOADING_ARTICLES})
  } catch (error) {
    console.log(error);
  }
};

export const deleteMaterialArticle = (id1,id2) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ARTICLES });
    const { data } = await api.deleteMaterialArticle(id1,id2);
    await dispatch({ type: "UPDATE_SUPPLIER", payload: data });
    dispatch({ type: END_LOADING_ARTICLES})
  } catch (error) {
    console.log(error);
  }
};

export const updateSaplingArticle = (id,updatedSaplingArticle) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ARTICLES });
    const { data } = await api.updateSaplingArticle(id,updatedSaplingArticle);
    dispatch({ type: "UPDATE_SUPPLIER", payload: data });
    dispatch({ type: END_LOADING_ARTICLES})
  } catch (error) {
    console.log(error);
  }
};

export const updateSeedArticle = (id,updatedSeedArticle) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ARTICLES });
    const { data } = await api.updateSeedArticle(id,updatedSeedArticle);
    dispatch({ type: "UPDATE_SUPPLIER", payload: data });
    dispatch({ type: END_LOADING_ARTICLES})
  } catch (error) {
    console.log(error);
  }
};

export const updateMaterialArticle = (id,updatedMaterialArticle) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ARTICLES });
    const { data } = await api.updateSeedArticle(id,updatedMaterialArticle);
    dispatch({ type: "UPDATE_SUPPLIER", payload: data });
    dispatch({ type: END_LOADING_ARTICLES})
  } catch (error) {
    console.log(error);
  }
};