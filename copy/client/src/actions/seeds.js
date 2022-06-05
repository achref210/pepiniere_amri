import * as api from "../api";
import { END_LOADING, START_LOADING } from "../constants/actionTypes";

//Action Creators
export const getSeeds = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSeeds();
    dispatch({ type: "FETCH_ALL", payload: data });
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

export const createSeed = (seed) => async (dispatch) => {
  try {
    const { data } = await api.createSeed(seed);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateSeed = (id, seed) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateSeed(id, seed);
    dispatch({ type: "UPDATE", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSeed = (id) => async (dispatch) => {
  try {
    await api.deleteSeeds(id);

    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};
