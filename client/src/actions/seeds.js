import * as api from "../api";
import { END_LOADING, START_LOADING } from "../constants/actionTypes";

//Action Creators
export const getSeeds = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSeeds();
    dispatch({ type: "FETCH_SEEDS", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getSeed = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSeed(id);
    dispatch({ type: "FETCH_SEED", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getSeedsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSeedsBySearch(searchQuery);
    dispatch({ type: "FETCH_BY_SEARCH", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRow = (id1, id2) => async (dispatch) => {
  try {
    const { data } = await api.deleteSeedRow(id1, id2);
    dispatch({ type: "DELETE_ROW", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCol = (id1, id2, key, value) => async (dispatch) => {
  try {
    const { data } = await api.updateSeedCol(id1, id2, key, value);
    dispatch({ type: "UPDATE_SEED", payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const createRow = (id) => async (dispatch) => {
  try {
    const { data } = await api.createSeedRow(id);
    await dispatch({ type: "CREATE_ROW", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createSeed = (seedData,stockData) => async (dispatch) => {
  try {
    const seed = {...seedData,stock:[stockData]};
    const { data } = await api.createSeed(seed);
    dispatch({ type: "CREATE_SEED", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateSeed = (id, seed) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateSeed(id, seed);
    dispatch({ type: "UPDATE_SEED", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSeed = (id) => async (dispatch) => {
  try {
    await api.deleteSeeds(id);
    console.log(id)

    dispatch({ type: "DELETE_SEED", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const getRefs = () => async (dispatch) => {
  try {
    console.log("refs")
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchRefs();
    dispatch({ type: "GET_REFS", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createRef = () => async (dispatch) => {
  try {
    const { data } = await api.createRef();
    dispatch({ type: "CREATE_REF", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateRef = (id,info) => async (dispatch) => {
  try {
    const { data } = await api.updateRef(id,info);
    dispatch({ type: "UPDATE_REF", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteRef = (id) => async (dispatch) => {
  try {
    await api.deleteRef(id);
    dispatch({ type: "DELETE_REF", payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const getRefBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchRefBySearch(searchQuery);
    dispatch({ type: "FETCH_REF_BY_SEARCH", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};